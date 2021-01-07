const { User } = require('../models');
const { comparePassword } = require('../helpers/bcrypt');
const { generateToken } = require('../helpers/jwt')
const { MyError } = require('../helpers/myError')
const { OAuth2Client } = require('google-auth-library');

class UserController {
    static login(req, res, next) {
        let { email, password } = req.body;

        User.findOne({where: { email }})
            .then(user => {
                let isLogin = !user ? false : comparePassword(password, user.password);

                if (!isLogin) {
                    throw new MyError('Invalid email / password', 'InvalidEmailPassword')
                }

                res.status(200).json({
                    access_token: generateToken({
                        id: user.id,
                        email: user.email
                    })
                })
            })
            .catch(err => next(err))
    }

    static googleLogin(req, res, next) {
        const { id_token } = req.body;
        const client = new OAuth2Client(process.env.OAUTH_CLIENT_ID)

        client.verifyIdToken({
            idToken: id_token,
            audience: process.env.OAUTH_CLIENT_ID,  
        })
            .then(ticket => {
                let { email } = ticket.getPayload();
                return User.findOrCreate({
                    where: {
                        email
                    }, defaults: {
                        password: (Math.floor(Math.random() * 10000000000000000)).toString()
                    }
                })
            })
            .then(user => {
                res.status(200).json({
                    access_token: generateToken({
                        id: user[0].id,
                        email: user[0].email
                    })
                })
            })
            .catch(err => {
                next(err)
            })

    }

    static addNewUser(req, res, next) {
        let newUser = {
            email: req.body.email,
            password: req.body.password,
            repeatPassword: req.body.repeatPassword
        }

        try {
            if (newUser.password === newUser.repeatPassword) {
                User.create(newUser, {
                    attributes: {
                        exclude: ['createdAt', 'updatedAt']
                    }
                })
                    .then(newUser => {
                        res.status(201).json({
                            id: newUser.id,
                            email: newUser.email,
                        })
                    })
                    .catch(err => next(err))
            } else {
                throw new MyError('Invalid password', 'InvalidPassword')
            }
        } catch (error) {
            next(error)
        }

        
    }
  
    static getUsers(req, res, next) {
        User.findAll({
            attributes: {
                exclude: ['createdAt','updatedAt']
            }
        })
            .then(users => {
                res.status(200).json(users)
            })
            .catch(err => next(err))
    }
}

module.exports = UserController

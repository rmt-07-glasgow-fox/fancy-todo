const { User } = require('../models');
const { comparePassword } = require('../helpers/bcrypt');
const { generateToken } = require('../helpers/jwt')
const { MyError } = require('../helpers/myError')

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

    static addNewUser(req, res, next) {
        let newUser = {
            email: req.body.email,
            password: req.body.password
        }

        User.create(newUser, {
            attributes: {
                exclude: ['createdAt','updatedAt']
            }
        })
            .then(newUser => {res.status(201).json({
                id: newUser.id,
                email: newUser.email,
            })})
            .catch(err => next(err))
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

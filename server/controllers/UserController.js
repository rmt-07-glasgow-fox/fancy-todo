const { User } = require('../models');
const { comparePassword } = require('../helpers/bcrypt');
const { generateToken } = require('../helpers/jwt')

class UserController {
    static register(req, res) {
        
    }

    static login(req, res) {
        let { email, password } = req.body;

        User.findOne({where: { email }})
            .then(user => {
                let isLogin = !user ? false : comparePassword(password, user.password);

                if (!isLogin) {
                    throw new Error('InvalidEmailPassord')
                }

                res.status(200).json({
                    access_token: generateToken({
                        id: user.id,
                        email: user.email
                    })
                })
            })
            .catch(err => {
                if (err.message == "InvalidEmailPassord") {
                    res.status(401).json({message: 'Invalid email / password'})
                } else {
                    res.status(500).json({message: "Internal server error"})
                }
            })
    }

    static addNewUser(req, res) {
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
            .catch(err => { 
                if (err.name === "SequelizeValidationError" || err.name === "SequelizeUniqueConstraintError") {
                    res.status(400).json({message: "Validation error"})
                } else {
                    res.status(500).json({ message: 'Internal server error'})
                }
            })
    }
  
    static getUsers(req, res) {
        User.findAll({
            attributes: {
                exclude: ['createdAt','updatedAt']
            }
        })
            .then(users => {
                res.status(200).json(users)
            })
            .catch(err => {
                res.status(500).json({message: 'Internal server error'})
            })
    }
}

module.exports = UserController
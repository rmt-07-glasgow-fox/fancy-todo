const { User } = require('../models');

class UserController {
    static register(req, res) {
        
    }

    static login(req, res) {

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
                email: newUser.email,
                password: newUser.password
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
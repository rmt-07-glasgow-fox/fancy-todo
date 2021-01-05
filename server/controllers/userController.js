const { User } = require('../models')

class UserController{
    static handleRegister(req, res){
        let value = {
            username: req.body.username,
            email: req.body.email,
            password: req.body.password
        }
        User.create(value)
        .then(data => {
            let result = {
                id: data.id,
                username: data.username,
                email: data.email
            }
            res.status(200).json(result)
        })
        .catch(err => {
            res.status(500).json(err)
        })
    }

    static handleLogin(req, res){
        
    }
}

module.exports = UserController
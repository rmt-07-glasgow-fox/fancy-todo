const { User } = require('../models')
const { unhashPassword, generateToken } = require('../helpers')

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
            res.status(201).json(result)
        })
        .catch(err => {
            // console.log(err);
            if (err.name === "SequelizeValidationError"){
                let errMsg = []
                err.errors.forEach(error => {
                    errMsg.push(error.message)
                });
                res.status(400).json(errMsg)
            } else {
                res.status(500).json({message: "Internal Server Error"})
            }
        })
    }

    static handleLogin(req, res){
        const email = req.body.email
        const password = req.body.password
        User.findOne({
            where: {email}
        })
        .then(data => {
            if (data && unhashPassword(password, data.password)){
                let acces_token = generateToken({
                    id: data.id,
                    username: data.username,
                    email: data.email
                })
                res.status(200).json({acces_token})
            } else {
                res.status(404).json({message: "Invalid Email/Password"})
            }
        })
        .catch(() => {
            res.status(500).json({message: "Internal Server Error"})
        })
    }
}

module.exports = UserController
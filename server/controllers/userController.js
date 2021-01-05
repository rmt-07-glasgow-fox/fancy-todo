const { User } = require('../models')
const { unhashPassword } = require('../helpers')

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
            // res.status(200).json(result)
            res.status(200).json({message: "Register Success"})
        })
        .catch(err => {
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
            // console.log(data);
            if (data && unhashPassword(password, data.password)){
                // res.status(200).json(data)
                res.status(200).json({message: "Login Success"})
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
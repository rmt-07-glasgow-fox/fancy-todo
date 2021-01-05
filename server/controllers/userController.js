const { User } = require('../models')
const { unhashPassword, generateToken } = require('../helpers')

class UserController{
    static handleRegister(req, res, next){
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
            if (err.name === "SequelizeValidationError" || err.name === "SequelizeUniqueConstraintError"){
                next({
                    status: 400,
                    errors: err.errors
                })
            } else {
                next({status: 500})
            }
        })
    }

    static handleLogin(req, res, next){
        const email = req.body.email
        const password = req.body.password
        User.findOne({
            where: {email}
        })
        .then(data => {
            if (data){
                if (unhashPassword(password, data.password)){
                    let access_token = generateToken({
                        id: data.id,
                        username: data.username,
                        email: data.email
                    })
                    res.status(200).json({access_token})
                } else{
                    next({
                        status: 400,
                        errors: [
                            { message: "Invalid Email/Password" }
                        ]
                    })
                }
            } else {
                next({
                    status: 401,
                    message: "Email not found, please register first"
                })
            }
        })
        .catch(() => {
            next({status: 500})
        })
    }
}

module.exports = UserController
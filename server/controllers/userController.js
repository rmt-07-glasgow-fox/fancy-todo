const {User} = require('../models')
const { checkPassword } = require('../helpers/bcrypt')
const { createToken } = require('../helpers/jwt')

class userController {
    static register(req, res){
        const newUser = {
            email: req.body.email,
            password: req.body.password
        }
        User.create(newUser)
        .then(data => {
            res.status(201).json({
                id : data.id,
                email : data.email
            })
        })
        .catch(err => {
            if(err.errors){
                let message = []
                err.errors.forEach(el => {
                    message.push(el.message)
                })
                res.status(400).json({
                    Errors : message
                })
            } else {
                res.status(500).json({message: 'Internal Server Error'})
            }
        })
    }

    static login(req, res){
        const { email, password } = req.body
        User.findOne({
            where : {
                email : email
            }
        })
        .then(user => {
            if(user){
                if(checkPassword(password, user.password)){
                    const payload = {
                        id : user.id,
                        email : user.email
                    }
                    const access_token = createToken(payload)
                    res.status(200).json({
                        access_token
                    })
                } else {
                    res.status(400).json({message : 'Incorect Email / Password'})
                }
                
            } else {
                res.status(400).json({message : 'Incorect Email / Password'})
            }   
        })
        .catch(err => {
            res.status(500).json({message : 'Internal Server Error'})
        })
    }
}


module.exports = userController 
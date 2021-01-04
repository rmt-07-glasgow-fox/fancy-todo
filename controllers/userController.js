const {User} = require('../models')
const {Bcrypt} = require('../helper/bcrypt')
const generateToken = require('../helper/webToken')

class UserController{
    static signUp(req,res){
        let user = {
            email: req.body.email,
            password: req.body.password
        }
        User.create(user)
        .then(data=>{
            res.status(200).json({id: data.id,email: data.email})
        })
        .catch(err=>{
            console.log(err)
            let errors = []
            if (err.name == 'SequelizeValidationError') {
                err.errors.forEach(e=>{
                    errors.push(e.message)
                })
            } if (err.name == 'SequelizeUniqueConstraintError') {
                err.errors.forEach(e=>{
                    errors.push(e.message)
                })
            }
            
            if (errors.length > 0) {
                res.status(400).json(errors)
            } else {
                res.status(500).json(err)
            }
        })
    }

    static signIn(req,res){
        let user = {
            email: req.body.email,
            password: req.body.password
        }
        User.findOne({where: {email: user.email}})
        .then(data=>{
            if (data) {
                if (Bcrypt.comparePassword(user.password,data.password)) {
                    const payload = {
                        id: data.id,
                        email: data.email
                    }
                    const accessToken = generateToken(payload)
                    res.status(200).json({accessToken: accessToken})
                } else {
                    res.status(401).json({msg: 'Invalid email or password'})
                }
                
            } else {
                res.status(404).json({msg: 'Invalid email or password'})
            }
        })
        .catch(err=>{
            console.log(err);
            res.status(500).json(err)
        })
    }
}

module.exports = UserController
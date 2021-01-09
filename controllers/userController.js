const {User} = require('../models')
const {Bcrypt} = require('../helper/bcrypt')
const {generateToken} = require('../helper/webToken')

class UserController{
    static signUp(req,res,next){
        let user = {
            email: req.body.email,
            password: req.body.password
        }
        User.create(user)
        .then(data=>{
            res.status(200).json({id: data.id,email: data.email})
        })
        .catch(err=>{
            next(err)
        })
    }

    static signIn(req,res,next){
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
                    next({name: 'unauthorized'})
                }
            } else {
                next({name: 'unauthorized'})
            }
        })
        .catch(err=>{
            next(err)
        })
    }

    static oAuth(req,res,next){
        let user = {
            email: req.body.email,
            password: req.body.password + 'qwerty123456789zxcvbnm'
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
                    next({name: 'unauthorized'})
                }
            } else {
                return User.create(user)
            }
        })
        .then(data=>{
            return User.findOne({where: {email: user.email}})
        })
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
                    next({name: 'unauthorized'})
                }
            } else {
                next({name: 'unauthorized'})
            }
        })
        .catch(err=>{
            res.status(500)
        })
    }
}

module.exports = UserController
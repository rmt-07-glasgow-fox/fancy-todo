const {OAuth2Client} = require('google-auth-library')
const { comparePassword } = require('../helpers/bcrypt');
const { generateToken } = require('../helpers/generateToken');
const {User} = require('../models')

class UsersController{
    static registerUser(req, res, next) {
        let {name, email, password} = req.body
        User.create({
            name, email, password
        })
        .then(user => {
            const response = {
                id: user.id,
                name: user.name,
                email: user.email
            }
            return res.status(201).json(response);
        })
        .catch(err => {
            next(err)
        })
    }
    static loginUser(req, res,next) {
        let {email, password} = req.body
        User.findOne({where: {email}})
        .then(user => {
            if(!user){
                next({name: "wrongInput"})
            }
            const match = comparePassword(password, user.password)
            if(match){
                const payload = {
                    id: user.id,
                    name: user.name,
                    email: user.email
                }
                const access_token = generateToken(payload)
                return res.status(200).json({access_token});
            }else {
                next({name: "wrongInput"})
            }
        })
        .catch(err => {
            next(err)
        })
    }

    static loginGoogle(req, res , next){
        const {id_token} = req.body
        const client = new OAuth2Client(process.env.GOOGLE_API)
        let payload = null
        //console.log(id_token)
        client.verifyIdToken({
            idToken: id_token,
            audience: process.env.GOOGLE_API
        })
        .then(ticket =>{
            payload = ticket.getPayload()
            return User.findOne({where: {email: payload.email}})
        })
        .then(user =>{
            if(!user){
                return User.create({
                    email: payload.email,
                    password: Math.floor(Math.random()*1000) + 'iniDariGoogle',
                    fullName: payload.name
                })
            }else {
                return user
            }
        })
        .then(user =>{
            let googleSign = {
                id: user.id,
                email: user.email
            }
            let acces_token = getToken(googleSign)
            res.status(200).json({acces_token})
        })
        .catch(err =>{
            next(err)
        })
    }
}

module.exports = UsersController

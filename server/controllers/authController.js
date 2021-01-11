const {OAuth2Client} = require('google-auth-library')
const {User} = require('../models')
const {compare} = require('../helpers/bcrypt')
const {generateToken} = require('../helpers/jwt')


class Controller {
    static register (req, res, next){
        let obj = {
            email: req.body.email,
            fullName: req.body.fullName,
            password: req.body.password
        }
        User.create(obj)
        .then(data =>{
            let response = {
                id: data.id,
                email: data.email
            }
            return res.status(201).json(response)
        })
        .catch(err =>{
            next(err)
        })
    }

    static login(req, res, next){
        let obj = {
            email: req.body.email,
            password: req.body.password
        }
        User.findOne({where: {email: obj.email}})
        .then(data =>{
            if(!data){
                next({name: 'accessDenied'})
            } else {

                let match = compare(obj.password, data.password)
                //console.log(match)
                if(match){
                    let payload = {
                        id: data.id,
                        email: data.email
                    }
                    //console.log(payload)
                    let accessToken = generateToken(payload)
                    return res.status(200).json({
                        access_token: accessToken
                    })
                }else {
                    next({name: 'accessDenied'})
                }
            }
        })
        .catch(err =>{
            //console.log(err)
            next(err)
        })
    }

    static googleLogin(req, res, next){
        let {id_token} = req.body
        const client = new OAuth2Client(process.env.Google_API)
        
        let payload = null
        //console.log(`masukkk====>`)
        client.verifyIdToken({
            idToken: id_token,
            audience: process.env.Google_API
        })
        .then(ticket =>{
            //console.log(ticket)
            payload = ticket.getPayload()
            return User.findOne({where: {email: payload.email}})
        })
        .then(user =>{
            //console.log(user)
            if(!user){
                //console.log(`masukkk====>`)
                return User.create({
                    email: payload.email,
                    fullName: payload.name,
                    password: Math.floor(Math.random()*1000) + 'iniDariGoogle'
                })
            } else{
                return user
            }
        })
        .then(user =>{
            let googleSign = {
                id: user.id,
                email: user.email
            }
            let accessToken = generateToken(googleSign)
            return res.status(200).json({
                access_token: accessToken
            })
        })
        .catch(err =>{
            console.log(err)
            next(err)
        })
    }
}

module.exports = Controller
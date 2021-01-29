const {OAuth2Client} = require('google-auth-library');
const { User } = require('../models')
const { comparePassword } = require('../helpers/bcryptjs')
const { generateToken } = require('../helpers/jwt')


class UserController {
    static postRegisterHandler(req, res, next) {
        const { name, email, password } = req.body

        User.create(req.body)
            .then(data => {
                res.status(201).json(data)
            })
            .catch(err => {
                next(err)
            })
    }

    static postLoginHandler(req, res, next) {
        const { email, password } = req.body

        User.findOne({where: {
            email
        }})
            .then(data => {
                // console.log(data)
                if(data && comparePassword(password, data.password)) {
                    // console.log('ok')
                    let payload = {
                        id: data.id,
                        email: data.email
                    }
                    const access_token = generateToken(payload)
                    // console.log(access_token)
                    res.status(200).json({
                        access_token
                    })
                } else {
                    next({name: "invalid"})
                    // res.status(401).json({message: "Invalid email/password"})
                }
                
            })
            .catch(err => {
                next(err)
            })
    }

    static loginGoogleHandler (req, res, next) {
        let { id_token } = req.body
        const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID)
        
        let payload = null
        //console.log(`masukkk====>`)
        client.verifyIdToken({
            idToken: id_token,
            audience: process.env.GOOGLE_CLIENT_ID
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

module.exports = UserController
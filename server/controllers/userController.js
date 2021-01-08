const {User} = require('../models')
const { checkPassword } = require('../helpers/bcrypt')
const { createToken } = require('../helpers/jwt')
const {OAuth2Client} = require('google-auth-library')

class userController {
    static register(req, res, next){
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
            next(err)
        })
    }

    static login(req, res, next){
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
                    res.status(200).json({access_token})
                } else {
                    res.status(400).json({message : 'Incorect Email / Password'})
                }
            } else {
                res.status(400).json({message : 'Incorect Email / Password'})
            }   
        })
        .catch(err => {
            next(err)
        })
    }

    static loginGoogle(req, res, next){
        const { id_token } = req.body
        const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID)
        let email = ''
        client.verifyIdToken({
            idToken: id_token,
            audience: process.env.GOOGLE_CLIENT_ID,  
        }).then(ticket => {
            const payload = ticket.getPayload();
            email = payload.email

            return User.findOne({
                where : {
                    email
                }
            })

        })
        .then(user => {
            if(!user) {
                return User.create({
                    email,
                    password : Math.random()*1000000000+' random password'
                })
            } else {
                return user
            }
        })
        .then(user => {
            const payload = {
                id : user.id,
                email : user.email
            }
            const access_token = createToken(payload)
            res.status(200).json({access_token})
        })
        .catch(err => {
            next(err)
        })
        
    }
}


module.exports = userController 
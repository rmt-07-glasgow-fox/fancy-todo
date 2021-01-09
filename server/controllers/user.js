const { User } = require('../models')
const { compare } = require('../helper/bcrypt')
const { generateToken } = require('../helper/jwt')
const { OAuth2Client } = require('google-auth-library')

class UserController{
    static async register(req, res, next){
        try{
            const {email, password} = req.body
            let data = await User.create({
                email,
                password
            })
            const response = {
                id: data.id,
                email: data.email
            }
            res.status(201).json(response)
        }catch(err){
            next(err)
        }
    }

    static async login(req, res, next){
        try{
            const {email, password} = req.body
            const user = await User.findOne({
                where: {
                    email: email
                }
            })
            if(!user) throw new Error('Invalid email / password')
            const matching = compare(password, user.password)
            if(matching){
                const payload = {
                    id: user.id,
                    email: user.email
                }
                const access_token = generateToken(payload)
                req.status(200).json({ access_token: access_token })
            }else{
                throw new Error('invalid email / password')
            }
        }catch(err){
            next(err)
        }
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

module.exports = UserController
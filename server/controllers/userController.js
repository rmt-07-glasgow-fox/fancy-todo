const {User} = require("../models")
const {comparePassword} = require("../helpers/bcrypt")
const {generateToken} = require("../helpers/jwt")

class userController {
    static signUp (req, res) {
        const {email, password} = req.body
        const data = {email, password}
        User.create(data)
        .then(user => {
            let output = {
                id: user.id,
                email: user.email
            }
            res.status(201).json(output)})
        .catch(err => res.status(400).json({message: err.message}))

    }

    static signIn (req, res) {
        User.findOne({where: {email: req.body.email}})
        .then(user => {
            if (!user) {
                res.status(401).json({message: "email not found"})
            } else {
                let match = comparePassword(req.body.password, user.password)
                if (!match) {
                    res.status(401).json({message: "email/password invalid"})
                } else {
                    const payload = {
                        id: user.id,
                        email: user.email
                    }
                    let access_token = generateToken(payload)
                    let id = user.id
                    res.status(200).json({access_token, id})
                }
            }
        })
        .catch(err => res.status(500).json({message: err.message}))
    }

    static loginGoogle(req, res , next){
        const {id_token} = req.body
        const client = new OAuth2Client(process.env.GOOGLE_API)
        let payload = null
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

module.exports = userController
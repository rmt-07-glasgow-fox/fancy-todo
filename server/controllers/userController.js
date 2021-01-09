const { User } = require('../models')
const { comparePass } = require('../helper/hash')
const { generateToken } = require('../helper/jwt')

class UserController{
    static addNew(req,res){
        const {name, username, email, password, status} = req.body  
        console.log(req.body.name);
        User.create({name, username, email, password, status})
        .then(data => {
            res.status(201).json(data)
        })
        .catch(err => {
            res.status(400).json(err)
        })
    } 
    static login(req,res){
        const {email,password} = req.body
        User.findOne({
            where:{
                email:email
            }
        })
        .then(data => {
            if (!data) {
                res.status(401).json({
                    msg: 'Invalid Email/Password'
                })
            } 
            if (comparePass(password, data.password)) {
                const payload = {
                    id: data.id,
                    name: data.name,
                    username: data.username,
                    email: data.email
                }
                const access_token = generateToken(payload)
                return res.status(200).json({
                    access_token : access_token
                })
            } else {
                throw{
                    msg: 'Invalid Email/Password'
                }
            }
        })
        .catch(err => {
            res.status(401).json(err)
        })
    }
    static loginGoogle(req,res){
        const {id_token} = req.body
        const client = new Oauth2Client(process.env.Google_API)
        let payload = null
        client.verifyidToken({
            idToken: id_token,
            audience: process.env.Google_API
        })
        .then(ticket => {
            payload = ticket.getPayload()
            return User.findOne({where: {email: payload.email}})
        })
        .then(user => {
            if (!user) {
                return User.create({
                    email: payload.email,
                    password: Math.ceil(Math.random()*100) + 'InigoogleXtodoRomi',
                    name: payload.name,
                    username: payload.username
                })
            } else {
                return user
            }
        })
        .then(user => {
            let googleSign = {
                id: user.id,
                email: user.email
            }
            let access_token = generateToken(googleSign)
            res.status(200).json({access_token})
        })
        .catch(err => {
            res.status(401).json(err)
        })
    }
}

module.exports = UserController
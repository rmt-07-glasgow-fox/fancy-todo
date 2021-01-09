const {OAuth2Client} = require('google-auth-library')
const {User} = require('../models')
const comparePassword = require('../helper/comparePass')
const generateToken = require('../helper/jwt')


class Controller{
    static register(req, res){
        let body = req.body
        let data = {
            email: body.email,
            password: body.password
        }
        User.create(data)
        .then(data=>{
            res.status(200).json({id:data.id, email:data.email})
        })
        .catch(err=>{
            res.status(400).json({message: err})
        })
    }
    
    static login(req, res){
        let body = req.body
        let dataUser = {
            email: body.email,
            password: body.password
        }
        User.findOne({where:{email:dataUser.email}})
        .then(data=>{
            if(!data){
                res.status(401).json({message: 'Email/Password incorrect'})
            }else{
                let match = comparePassword(dataUser.password, data.password)
                if(match){
                    let payload = {id: data.id, email:data.email}
                    let access_token = generateToken(payload)
                    return res.status(200).json({access_token})
                }else{
                    res.status(401).json({message: 'Email/Password incorrect'})
                }
            }
        })
        .catch(err=>{
            res.status(400).json(err)
            console.log(err)
        })
    }

    static logInGoogle(req, res, next){
        let email= null
        let id_token = req.body.id_token
        const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID)
        client.verifyIdToken({
            idToken: id_token,
            audience: process.env.GOOGLE_CLIENT_ID,
        })
        .then(ticket=>{
            const payload = ticket.getPayload();
            email = payload.email
            return User.findOne({where:{email}})
        })
        .then(data=>{
            if(!data){
                return User.create({
                    email,
                    password: "12345678"
                })
            }else{
                return data
            }
        })
        .then(data=>{
            let payload = {id: data.id, email: data.email}
            let access_token = generateToken(payload)
            return res.status(200).json({id: data.id, email: data.email, access_token})
        })
        .catch(err=>{
            console.log(err)
            next(err)
        })   
    }
}

module.exports = Controller
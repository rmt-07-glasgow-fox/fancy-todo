const { User } = require('../models')
const { comparePassword } = require('../helpers/bcryptjs')
const { generateToken } = require('../helpers/jsonwebtoken')
const { OAuth2Client } = require('google-auth-library');

class UserController {
    static register(req, res, next) {
        let userObj = {
            fullName: req.body.fullName,
            email: req.body.email, 
            password: req.body.password
        }
        User.create(userObj)
            .then(data => {
                let result = {
                    id: data.id,
                    email: data.email
                }
                res.status(201).json(result)
            })
            .catch(err => {
                // res.send(err)
                // console.log(`INI ERRORNYA`, err)
                next(err)
            })
    }
    
    static login(req, res, next) {
        const { email, password } = req.body
        User.findOne({
            where: { email }
        }) 
            .then(data => {
                if (!data) {
                    next({ name: 'Invalid Input' })
                } else {
                    if (comparePassword(password, data.password)) { 
                        let payload = {
                            id: data.id,
                            fullName: data.fullName, 
                            email: data.email
                        }

                        let access_token = generateToken(payload)
                        res.status(200).json({ access_token })
                    } else {
                        next({ name: 'Invalid Input' })
                    }
                }
            })
            .catch(err => {
                // console.log(err)
                next(err)
            })
    }

    static loginGoogle(req, res, next) {
        let id_token = req.body.id_token
        const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);
        let email 
        let fullName
        client.verifyIdToken({
            idToken: id_token,
            audience: process.env.GOOGLE_CLIENT_ID
        })
            .then(ticket => {
                const payload = ticket.getPayload();
                // console.log(payload)
                email = payload.email
                fullName = payload.name
                return User.findOne({
                    where: { email }
                })
            })
            .then(data => {
                if (data) {
                    return data
                } else {
                    return User.create({
                        email, 
                        fullName, 
                        password: Math.random()*1000 + 'meongeongoen'
                    })
                }
            })
            .then(data => {
                let payload = {
                    id: data.id, 
                    fullName: data.fullName, 
                    email: data.email
                }
                let access_token = generateToken(payload)
                res.status(200).json({ access_token })
            })
            .catch(next)
        
    }
}

module.exports = UserController
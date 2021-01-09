const { User } = require('../models/index')
const { comparePassword } = require('../helper/bcrypt')
const { generateToken } = require('../helper/jwt')
const { OAuth2Client } = require('google-auth-library');

class ControllerUser {

    static findUser(req, res, next) {
        User.findAll()
        .then(data => {
            res.status(200).json(data)
        })
        .catch(err => {
            next(err)
        })
    }

    static register (req, res, next) {
        console.log(req.body);
        let obj = {
            email: req.body.email,
            password: req.body.password
        }
        console.log(obj);
        User.create(obj)
        .then(user => {
            const response = {
                id: user.id,
                email: user.email
            }
            res.status(200).json(response)
        })
        .catch(err => {
                next(err)
        })
    }
    static async login (req, res, next) {
        console.log(req.headers);
        try {
            let obj = {
                email: req.body.email,
                password: req.body.password
            }
            console.log(obj.email);
            const user = await User.findOne({
                where: { 
                    email: req.body.email 
                }
            })
            console.log(obj);
            if (!user) {
                return next({
                    name: "invalid email / password" 
                })
            }
            const match = comparePassword(obj.password, user.password)
            if (match) {
                //jwt
                // console.log(match);
                const payload = {
                    id: user.id,
                    email: user.email
                }
                const access_token = generateToken(payload)
                return res.status(200).json({
                    access_token: access_token
                })
            } else {
                return next({
                    name: "invalid email / password" 
                })
            }

        } catch (error) {
            console.log(error);
            return next(error)
        }
    }


    static loginGoogle(req, res, next) {
        const { id_token } = req.body;
        let email = null
        let client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID)
        console.log(id_token);

        client.verifyIdToken({
            idToken: id_token ,
            audience: process.env.GOOGLE_CLIENT_ID
        }).then(ticket => {
            console.log(ticket);
            const payload = ticket.getPayload()
            console.log(payload);
            email = payload.email

            return User.findOne({
                where: { email }
            })
        })
        .then(user => {
            console.log('2');

            if (!user) {
                return User.create({
                    email,
                    password: Math.random() * 100 + 'random-password'
                })
            } else {
                return user
            }
        })
        .then(user => {
            console.log('3');

            const payload = {
                email: user.email,
                id:user.id
            }
            const access_token = generateToken(payload)

            res.status(200).json({
                id: user.id,
                email: user.email,
                access_token: access_token
            })
        })
        .catch(err => {
            console.log(err);
            next(err)
        })
            
    }
}

module.exports = ControllerUser
const { User } = require('../models')
const { OAuth2Client } = require('google-auth-library');
const { comparePassword } = require('../helpers/bcryptjs')
const { genToken } = require('../helpers/jwt')

class UserController {
    static async register(req, res, next) {
        try {
            let obj = {
                email: req.body.email,
                password: req.body.password
            }
            let newUser = await User.create(obj)
            res.status(201).json(newUser)
        } catch (err) {
            next(err)
        }
    }

    static async login(req, res, next) {
        try {
            let { email, password } = req.body

            let user = await User.findOne({
                where: {email}
            })
        // cek imel
            if (!user) {
                next({name: 'WrongInput', message: 'invalid email / password'})
            }
        // cek password
            let match = comparePassword(password, user.password)
            if (match) {
                let payload = {
                    id: user.id,
                    email: user.email
                }
                let access_token = genToken(payload)
                res.status(200).json({access_token})
            } else {
                next({name: 'WrongInput', message: 'invalid email / password'})
            }
        } catch (err) {
            next(err)
        }
    }

    static async loginGoogle(req, res, next) {
        let { id_token } = req.body
        let email = null
        const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

        client.verifyIdToken({
            idToken: id_token,
            audience: process.env.GOOGLE_CLIENT_ID,
        })
        .then(ticket => {
        const payload = ticket.getPayload();
        email = payload.email

        return User.findOne({
            where: {email}
        })
        })
        .then(user => {
            if(!user) {
                return User.create({
                    email,
                    password: Math.random()*1000+'ini random'
                })
            } else {
                return user
            }
        })
        .then(user => {
            const payload = {
                id: user.id,
                email: user.email
            }
            const access_token = genToken(payload)
            return res.status(200).json({
                access_token
            })
        })
        .catch(err =>{
            next(err)
        })
    }
}

module.exports = UserController
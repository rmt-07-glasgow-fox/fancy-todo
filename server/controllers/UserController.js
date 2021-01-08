const { User } = require('../models')
const { comparePassword } = require('../helpers/bcrypt')
const { generateToken } = require('../helpers/jwt')
const { OAuth2Client } = require('google-auth-library')


class UserController {
    static register(req, res) {
        const { email, password } = req.body

        User.create({
            email,
            password
        })
            .then(user => {
                const resp = {
                    id: user.id,
                    email: user.email
                }
                res.status(201).json(resp)
            })
            .catch(err => {
                console.log(err)
                res.status(400).json(err)
            })
    }

    static login(req, res) {
        const { email, password } = req.body

        User.findOne({
            where: {
                email
            }
        })
            .then(user => {
                if (!user) {
                    return res.status(401).json({
                        message: "Invalid email / password"
                    })
                }

                const match = comparePassword(password, user.password)

                if (match) {
                    const payload = {
                        id: user.id,
                        email: user.email
                    }

                    const access_token = generateToken(payload)

                    return res.status(200).json({
                        access_token
                    })
                }
                else {
                    return res.status(401).json({
                        message: "Invalid email / password"
                    })
                }

            })
            .catch(err => {
                res.status(401).json(err)
            })
    }

    static loginGoogle(req, res, next) {
        const { id_token } = req.body
        let email = null
        const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID)

        client.verifyIdToken({
            idToken: id_token,
            audience: process.env.GOOGLE_CLIENT_ID
        })
            .then(ticket => {
                const payload = ticket.getPayload()
                email = payload.email

                return User.findOne({
                    where: {
                        email
                    }
                })
            })
            .then(user => {
                if (!user) {
                    return User.create({
                        email,
                        password: Math.random() * 1000 + 'random password generator'
                    })
                }
                else {
                    return user
                }
            })
            .then(user => {
                const payload = {
                    email: user.email,
                    id: user.id
                }

                const access_token = generateToken(payload)

                res.status(200).json({
                    access_token
                })

            })
            .catch(err => {
                next(err)
            })
    }
}

module.exports = UserController

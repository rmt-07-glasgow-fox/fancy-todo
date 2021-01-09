const { User } = require('../models')
const { compared } = require('../helpers/bcrypt')
const { generateToken } = require('../helpers/jwt')
const { OAuth2Client } = require('google-auth-library');
const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

class UserController {
    static async register(req, res, next) {
        try {
            const newUser = {
                email: req.body.email,
                password: req.body.password
            }
            const userCreate = await User.create(newUser)
            res.status(201).json({
                id: userCreate.id,
                email: userCreate.email
            })
        }
        catch(error) {
            next(error)
        }
    }

    static async login(req, res, next) {
        try {
            const data = {
                email: req.body.email,
                password: req.body.password
            }
            const userLogin = await User.findOne({
                where: {
                    email: data.email
                }
            })
            if(!userLogin) {
                throw {
                    status: 401,
                    message: 'Invalid email/password'
                }
            }
            else {
                const compare = compared(data.password, userLogin.password)
                if(!compare) {
                    throw {
                        status: 401,
                        message: 'Invalid email/password'
                    }
                }
                else {
                    const token = {
                        id: userLogin.id,
                        email: userLogin.email
                    }
                    const access_token = generateToken(token)
                    res.status(200).json({ access_token })
                }
            }

        }
        catch(error) {
            next(error)
        }
    }

    static async googleLogin(req, res, next) {
        try {
            const ticket = await client.verifyIdToken({
                idToken: req.body.googleToken,
                audience: process.env.GOOGLE_CLIENT_ID
            })
            const payload = ticket.getPayload()
            const user = await User.findOne({
                where: {
                    email: payload.email
                }
            })
            if(user) {
                const dataUser = {
                    id : user.id,
                    email : user.email
                }
                const access_token = generateToken(dataUser)
                res.status(200).json({
                    access_token
                })
            }
            else {
                const newUser = {
                    email: payload.email,
                    password: process.env.PASSWORD
                }
                const register = await User.create(newUser)
                const dataUser = {
                    id : register.id,
                    email : register.email
                }
                const access_token = generateToken(dataUser)
                res.status(201).json({
                    access_token
                })
            }
        }
        catch(error) {
            next(error)
        }
    }
}

module.exports = UserController
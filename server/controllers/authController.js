const { User } = require('../models')
const {OAuth2Client} = require('google-auth-library');
const comparePassword = require('../helpers/bcryptjs.js').comparePassword
const generateToken = require('../helpers/jwt.js').generateToken

module.exports = class AuthController {
    static getRegister(req, res, next) {
        User.findAll({
            attributes: {
                exclude: [ 'password', 'createdAt', 'updatedAt' ]
            }
        })
        .then( data => {
            return res.status(200).json(data)
        } )
        .catch( err => {
            next(err)
        } )
    }

    static postRegister(req, res, next) {
        const { email, password } = req.body

        User.create({
            email, password
        })
        .then( data => {
            const response = {
                id: data.id,
                email: data.email
            }
            return res.status(201).json(response)
        } )
        .catch( err => {
            next(err)
        } )
    }

    static removeRegister(req, res, next) {
        User.destroy({
            where: {
                id: req.params.id
            }
        })
        .then( data => {
            if (data === 1) {
                return res.status(200).json({ message: 'User has been deleted' })
            } else {
                next({ name: "todoNotFound" })
            }
        } )
        .catch( err => {
            next(err)
        } )
    }

    static async postLogin(req, res, next) {
        try {
            const { email, password } = req.body
            const user = await User.findOne({
                where: {
                    email: email
                }
            })

            if (!user) next({ name: 'loginFailed' })
            
            const match = comparePassword(password, user.password)

            if (match) {
                const payload = {
                    id: user.id,
                    email: user.email
                }
                const access_token = generateToken(payload)

                return res.status(200).json({
                    access_token: access_token
                })
            } else next({ name: 'loginFailed' })

        } catch (err) {
            next(err)
        }
    }

    static async loginGoogle(req, res, next) {
        try {
            const client = new OAuth2Client(process.env.CLIENT_ID);
            const ticket = await client.verifyIdToken({
                idToken: req.body.id_token,
                audience: process.env.CLIENT_ID,
            })
            const payload = ticket.getPayload();
            const email = payload.email;
            const found = await User.findOne({
                where: {
                    email: email
                }
            })
            
            if (!found) {
                found = await User.create({
                    email,
                    password: Math.random()*100 + 'fancytodos'
                })
            }

            const pyld = {
                id: found.id,
                email: found.email
            }
            const access_token = generateToken(pyld)
            res.status(200).json({ access_token: access_token })
        } catch (err) {
            next(err)
        }
    }
}
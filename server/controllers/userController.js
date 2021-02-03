const {OAuth2Client} = require('google-auth-library');
const { User } = require('../models')
const { compare } = require('../helpers/hashPassword')
const { generateToken } = require('../helpers/jwt')

class Controller {
    static register(req, res, next) {
        const { email, password } = req.body
        User.create({
            email, password
        })
        .then(data => {
            let { id, email } = data
            res.status(201).json({id, email})
        })
        .catch(err => {
            next(err)
        })
    }

    static async login(req, res, next) {
        try {
            const{ email, password } = req.body
            const user = await User.findOne({
                where: {
                    email
                }
            })
            if (!user) {
                throw ({ name: "failedSignIn"})
            }
            const match = compare(password, user.password)
            if (match) {
                const payload = {
                    id: user.id,
                    email: user.email
                }
                const access_token = generateToken(payload)
                return res.status(200).json({access_token})
            } else {
                throw ({ name: "failedSignIn"})
            }
        } catch (err) {
            next(err)
        }
    }

    static signInGoogle(req, res, next) {
        const { id_token } = req.body;
        const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);
        let email = ''

        client.verifyIdToken({
            idToken: id_token,
            audience: process.env.GOOGLE_CLIENT_ID,  // Specify the CLIENT_ID of the app that accesses the backend
            // Or, if multiple clients access the backend:
            //[CLIENT_ID_1, CLIENT_ID_2, CLIENT_ID_3]
        })
        .then(ticket => {
            const payload = ticket.getPayload();
            email = payload.email;
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
                    password: Math.random()*1000 + 'fancy todo google random password'
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
            const access_token = generateToken(payload) 
            res.status(200).json({access_token})
        })
        .catch(err => {
            next(err )
        })
      

    }
}

module.exports = Controller
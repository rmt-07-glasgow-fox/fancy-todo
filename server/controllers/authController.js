const {OAuth2Client} = require('google-auth-library');
const { compare } = require('../helpers/hashPassword')
const { generateToken } = require('../helpers/jwt')
const { User } = require('../models')

class Controller {
    static register(req, res, next) {
        const { email, password } = req.body
        User
            .create({email, password})
            .then(newUser => {
                const { id, email } = newUser
                res.status(201).json({id, email})
            })
            .catch(err => next(err))
    }

    static login(req, res, next) {
        const { email, password } = req.body
        User
            .findOne({
                where: {email}
            })
            .then(data => {
                if (compare(password, data.password)) {
                    const { id, email } = data
                    const access_token = generateToken({ id, email })
                    res.status(200).json({access_token})
                }else {
                    next({name: 'CustomError', statusCode: 400, message: 'Email or password wrong!'})
                }
            })
            .catch(err => next({name: 'CustomError', statusCode: 400, message: 'Email or password wrong!'}))
    }

    static loginGoogle(req, res, next) {
        const { id_token } = req.body
        const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);
        let payload
        let email
        client
            .verifyIdToken({
                idToken: id_token,
                audience: process.env.GOOGLE_CLIENT_ID
            })
            .then(ticket => {
                payload = ticket.getPayload();
                email = payload.email;
                return User.findOne({
                    where: { email }
                })
            })
            .then(user => {
                const password = Math.random()*100000+' random password'
                return !user ? User.create({ email, password }) : user
            })
            .then(user => {
                const { email, id } = user
                const payload = { email, id }
                const access_token = generateToken(payload)
                res.status(200).json({ access_token })
            })
            .catch(err => next(err))
    }
}

module.exports = Controller
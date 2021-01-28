const {OAuth2Client} = require('google-auth-library');
const { compare } = require('../helpers/hashPassword')
const { generateToken } = require('../helpers/jwt')
const { User } = require('../models')

class Controller {
    static register(req, res, next) {
        const { email, password, name } = req.body
        User
            .create({ email, password, name })
            .then(newUser => {
                const { id, email, name } = newUser
                res.status(201).json({ id, email, name })
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
                    const { id, email, name } = data
                    const access_token = generateToken({ id, email, name })
                    res.status(200).json({ access_token })
                }else {
                    next({name: 'CustomError', statusCode: 400, message: 'Email or password wrong!'})
                }
            })
            .catch(err => next({name: 'CustomError', statusCode: 400, message: 'Email or password wrong!'}))
    }

    static loginGoogle(req, res, next) {
        const { id_token } = req.body
        const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);
        let email, name
        client
            .verifyIdToken({
                idToken: id_token,
                audience: process.env.GOOGLE_CLIENT_ID
            })
            .then(ticket => {
                const payload = ticket.getPayload();
                email = payload.email;
                name = payload.name;
                return User.findOne({
                    where: { email }
                })
            })
            .then(user => {
                const password = Math.random()*100000+' random password'
                return !user ? User.create({ email, password, name }) : user
            })
            .then(user => {
                const { id, email, name } = user
                const access_token = generateToken({ id, email, name })
                res.status(200).json({ access_token })
            })
            .catch(err => next(err))
    }
}

module.exports = Controller
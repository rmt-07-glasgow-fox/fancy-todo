const { User } = require("../models")
const { compare } = require("../helpers/hashPassword.js")
const { makeToken } = require("../helpers/jwt.js")
const { OAuth2Client } = require('google-auth-library');

class userController {

    static signUp(req, res, next) {
        const { email, password } = req.body

        User.create({ email, password })
            .then(data => {
                res.status(201).json({ id: data.id, email: data.email })
            })
            .catch(err => {
                next({
                    message: err.message,
                    code: 400,
                    from: 'sign up'
                })
            })
    }

    static async signIn(req, res, next) {
        try {
            const { email, password } = req.body
            const user = await User.findOne({
                where: {
                    email
                }
            })
            if (!user) {
                next({
                    message: "invalid email / password",
                    code: 401,
                    from: 'sign in'
                })
            } else {
                const valid = compare(password, user.password)
                if (valid) {
                    const payload = {
                        id: user.id,
                        email: user.email
                    }

                    const access_token = makeToken(payload)
                    res.status(200).json({ access_token })
                } else {
                    next({
                        message: "invalid email / password",
                        code: 401,
                        from: 'sign in'
                    })
                }
            }
        } catch (err) {
            next({
                message: err.message,
                code: 400,
                from: 'sign in'
            })
        }



    }

    static googleLogin(req, res, next) {
        const { id_token } = req.body
        const client = new OAuth2Client(process.env.CLIENT_GOOGLE_ID);
        let email
        client.verifyIdToken({
            idToken: id_token,
            audience: process.env.CLIENT_GOOGLE_ID,
        })
            .then(ticket => {
                const payload = ticket.getPayload();
                email = payload.email

                return User.findOne({
                    where: {
                        email
                    }
                })
            })
            .then(data => {
                if (!data) {
                    return User.create({
                        email,
                        password: Math.random() * 1000 + 'random google'
                    })
                } else {
                    return data
                }
            })
            .then(user => {
                const payload = {
                    id: user.id,
                    email: user.email
                }

                const access_token = makeToken(payload)
                res.status(200).json({ access_token })
            })
            .catch(err => {
                next({
                    message: err.message,
                    code: 500,
                    from: 'google login'
                })
            })
    }

}

module.exports = userController
const { User } = require("../models")
const { compare } = require("../helpers/hashPassword.js")
const { makeToken } = require("../helpers/jwt.js")

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

                    const accesToken = makeToken(payload)
                    res.status(200).json({ accesToken })
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

}

module.exports = userController
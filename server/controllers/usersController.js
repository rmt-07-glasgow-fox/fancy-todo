const { User } = require("../models")
const { compare } = require("../helpers/hashPassword.js")
const makeToken = require("../helpers/jwt.js")

class userController {

    static signUp(req, res) {
        const { email, password } = req.body

        User.create({ email, password })
            .then(data => {
                res.status(201).json({ id: data.id, email: data.email })
            })
            .catch(err => {
                res.status(400).json(err)
            })
    }

    static async signIn(req, res) {
        try {
            const { email, password } = req.body
            const user = await User.findOne({
                where: {
                    email
                }
            })
            if (!user) {
                res.status(401).json({ message: "invalid email / password" })
            }

            const valid = compare(password, user.password)
            if (valid) {
                const payload = {
                    id: user.id,
                    email: user.email
                }

                const accesToken = makeToken(payload)
                res.status(200).json({ accesToken })

            } else {
                res.status(401).json({ message: "invalid email / password" })
            }

            // res.status(200).json(user)

        } catch (err) {
            res.status(400).json(err)
        }



    }

}

module.exports = userController
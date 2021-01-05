const {User} = require("../models")
const {comparePassword} = require("../helpers/bcrypt")
const {generateToken} = require("../helpers/jwt")

class userController {
    static signUp (req, res) {
        const {email, password} = req.body
        const data = {email, password}
        User.create(data)
        .then(user => {
            let output = {
                id: user.id,
                email: user.email
            }
            res.status(201).json(output)})
        .catch(err => res.status(400).json({message: err.message}))

    }

    static signIn (req, res) {
        User.findOne({where: {email: req.body.email}})
        .then(user => {
            if (!user) {
                res.status(401).json({message: "email not found"})
            } else {
                let match = comparePassword(req.body.password, user.password)
                if (!match) {
                    res.status(401).json({message: "email/password invalid"})
                } else {
                    const payload = {
                        id: user.id,
                        email: user.email
                    }
                    let access_token = generateToken(payload)
                    res.status(200).json({access_token})
                }
            }
        })
        .catch(err => res.status(500).json({message: err.message}))
    }

}

module.exports = userController
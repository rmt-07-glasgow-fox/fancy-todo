const {User} = require('../models')
const comparePassword = require('../helpers/comparePassword')


class UserController {
    static register(req, res) {
        const {email, password} = req.body

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
                res.status(400).json(err)
            })
    }

    static login(req, res) {
        const {email, password} = req.body

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
                    res.status(200).json({
                        message: "OK from login page"
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
}

module.exports = UserController

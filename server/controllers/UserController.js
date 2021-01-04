const {User} = require('../models')

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

    }
}

module.exports = UserController

const { User } = require('../models')

class UserController {
    static async register(req, res) {
        try {
            let obj = {
                username: req.body.username,
                email: req.body.email,
                password: req.body.password,
            }
            let newUser = await User.create(obj)
            res.status(201).json(newUser)
        } catch (err) {
            res.status(500).json({message: 'interrnal server error'})
        }
    }
}

module.exports = UserController
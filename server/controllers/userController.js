const { User } = require('../models')

class UserController {
    static async register(req, res, next) {
        try {
            const newUser = {
                email: req.body.email,
                password: req.body.password
            }
            const userData = await User.create(userData)
            res.status(201).json({
                id: userData.id,
                email: userData.email
            })
        }
        catch(error) {
            next(error)
        }
    }

    static login(req, res) {

    }
}

module.exports = UserController
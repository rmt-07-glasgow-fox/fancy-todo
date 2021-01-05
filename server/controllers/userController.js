const { User } = require('../models')

class UserController {
    static async register(req, res) {
        try {
            let newUser = {
                email: req.body.email,
                password: req.body.password
            }

            let created = await User.create(newUser)
            res.status(201).json({ message: 'Berhasil bikin account baru' })

        } catch (err) {
            let errorMessage = err.errors.map(error => error.message)
            res.status(400).json({ message: errorMessage })
        }
    }

    static async login(req, res) {
        try {
            let email = req.body.email
            let password = req.body.password

            let login = await User.findOne({ where: { email, password } })
            console.log(login)
            res.status(200).json({ message: 'Berhasil login' })

        } catch (err) {
            let errorMessage = err.errors.map(error => error.message)
            res.status(400).json({ message: errorMessage })
        }
    }
}

module.exports = UserController
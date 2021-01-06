const { User } = require('../models')
const { comparePassword } = require('../helpers/bcryptjs')
const { genToken } = require('../helpers/jwt')

class UserController {
    static async register(req, res, next) {
        try {
            let obj = {
                username: req.body.username,
                email: req.body.email,
                password: req.body.password,
            }
            let newUser = await User.create(obj)
            res.status(201).json(newUser)
        } catch (err) {
            next(err)
        }
    }

    static async login(req, res, next) {
        try {
            let { email, password } = req.body

            let user = await User.findOne({
                where: {email}
            })
        // cek imel
            if (!user) {
                next({name: 'WrongInput', message: 'invalid email / password'})
            }
        // cek password
            let match = comparePassword(password, user.password)
            if (match) {
                let payload = {
                    id: user.id,
                    email: user.email
                }
                let access_token = genToken(payload)
                res.status(200).json({access_token})
            } else {
                next({name: 'WrongInput', message: 'invalid email / password'})
            }
        } catch (err) {
            next(err)
        }
    }
}

module.exports = UserController
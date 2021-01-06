const { User } = require('../models')
const { comparePassword } = require('../helpers/bcryptjs')
const { genToken } = require('../helpers/jwt')

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
            let eror = []
            if (err) {
                err.errors.forEach(e => {
                    eror.push(e.message)
                });
            }
            res.status(400).json(eror)
        }
    }

    static async login(req, res) {
        try {
            let { email, password } = req.body

            let user = await User.findOne({
                where: {email}
            })
        // cek imel
            if (!user) {
                res.status(401).json({message: 'invalid email / password'})
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
                res.status(401).json({message: 'invalid email / password'})
            }
        } catch (err) {
            console.log(err);
            res.status(400).json(err)
        }
    }
}

module.exports = UserController
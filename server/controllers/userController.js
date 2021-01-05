const { User } = require('../models')
const { compare } = require('../helpers/hashPassword')
const { generateToken } = require('../helpers/jwt')

class Controller {
    static register(req, res, next) {
        const { email, password } = req.body
        User.create({
            email, password
        })
        .then(data => {
            let { id, email } = data
            res.status(201).json({id, email})
        })
        .catch(err => {
            next(err)
        })
    }

    static async login(req, res, next) {
        try {
            const{ email, password } = req.body
            const user = await User.findOne({
                where: {
                    email
                }
            })
            if (!user) {
                throw ({ name: "failedSignIn"})
            }
            const match = compare(password, user.password)
            if (match) {
                const payload = {
                    id: user.id,
                    email: user.email
                }
                const access_token = generateToken(payload)
                return res.status(200).json({access_token})
            } else {
                throw ({ name: "failedSignIn"})
            }
        } catch (err) {
            next(err)
        }
    }
}

module.exports = Controller
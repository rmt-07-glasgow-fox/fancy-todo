const { User } = require('../models')
const { compared } = require('../helpers/bcrypt')
const { generateToken } = require('../helpers/jwt')

class UserController {
    static async register(req, res, next) {
        try {
            const newUser = {
                email: req.body.email,
                password: req.body.password
            }
            const userCreate = await User.create(newUser)
            res.status(201).json({
                id: userCreate.id,
                email: userCreate.email
            })
        }
        catch(error) {
            next(error)
        }
    }

    static async login(req, res, next) {
        try {
            const data = {
                email: req.body.email,
                password: req.body.password
            }
            const userLogin = await User.findOne({
                where: {
                    email: data.email
                }
            })
            if(!userLogin) {
                throw {
                    status: 401,
                    message: 'Invalid email/password'
                }
            }
            else {
                const compare = compared(data.password, userLogin.password)
                if(!compare) {
                    throw {
                        status: 401,
                        message: 'Invalid email/password'
                    }
                }
                else {
                    const token = {
                        id: userLogin.id,
                        email: userLogin.email
                    }
                    const access_token = generateToken(token)
                    res.status(200).json({ access_token })
                }
            }

        }
        catch(error) {
            next(error)
        }
    }
}

module.exports = UserController
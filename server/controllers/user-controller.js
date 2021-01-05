const { User } = require('../models')
const { comparePassword } = require('../helpers/bcryptjs')
const { generateToken } = require('../helpers/jwt')
const user = require('../models/user')

class UserController {
    static postRegisterHandler(req, res, next) {
        const { name, email, password } = req.body

        User.create(req.body)
            .then(data => {
                res.status(201).json(data)
            })
            .catch(err => {
                next(err)
            })
    }

    static postLoginHandler(req, res, next) {
        const { email, password } = req.body

        User.findOne({where: {
            email
        }})
            .then(data => {
                if(data && comparePassword(password, data.password)) {
                    let payload = {
                        id: data.id,
                        email: data.email
                    }
                    const access_token = generateToken(payload)
                    res.status(200).json({
                        access_token
                    })
                } else {
                    next({name: "invalid"})
                    // res.status(401).json({message: "Invalid email/password"})
                }
                
            })
            .catch(err => {
                next(err)
            })
    }
}

module.exports = UserController
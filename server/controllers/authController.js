const { User } = require('../models')
const comparePassword = require('../helpers/bcryptjs.js').comparePassword
const generateToken = require('../helpers/jwt.js').generateToken

module.exports = class AuthController {
    static getRegister(req, res, next) {
        User.findAll({
            attributes: {
                exclude: [ 'password', 'createdAt', 'updatedAt' ]
            }
        })
        .then( data => {
            return res.status(200).json(data)
        } )
        .catch( err => {
            next(err)
        } )
    }

    static postRegister(req, res, next) {
        const { email, password } = req.body

        User.create({
            email, password
        })
        .then( data => {
            const response = {
                id: data.id,
                email: data.email
            }
            return res.status(201).json(response)
        } )
        .catch( err => {
            next(err)
        } )
    }

    static removeRegister(req, res, next) {
        User.destroy({
            where: {
                id: req.params.id
            }
        })
        .then( data => {
            if (data === 1) {
                return res.status(200).json({ message: 'User has been deleted' })
            } else {
                next({ name: "todoNotFound" })
            }
        } )
        .catch( err => {
            next(err)
        } )
    }

    static async postLogin(req, res, next) {
        try {
            const { email, password } = req.body
            const user = await User.findOne({
                where: {
                    email: email
                }
            })

            if (!user) next({ name: 'loginFailed' })
            
            const match = comparePassword(password, user.password)

            if (match) {
                const payload = {
                    id: user.id,
                    email: user.email
                }
                const acces_token = generateToken(payload)

                return res.status(200).json({
                    acces_token: acces_token
                })
            } else next({ name: 'loginFailed' })

        } catch (err) {
            next(err)
        }
    }
}
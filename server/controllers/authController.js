const { User } = require('../models')
const comparePassword = require('../helpers/bcryptjs.js').comparePassword
const generateToken = require('../helpers/jwt.js')

module.exports = class AuthController {
    static getRegister(req, res) {
        User.findAll({
            attributes: {
                exclude: [ 'password', 'createdAt', 'updatedAt' ]
            }
        })
        .then( data => {
            return res.status(200).json(data)
        } )
        .catch( err => {
            return res.status(500).json({
                message: "Internal server error"
            })
        } )
    }

    static postRegister(req, res) {
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
            return res.status(400).json(err)
        } )
    }

    static removeRegister(req, res) {
        User.destroy({
            where: {
                id: req.params.id
            }
        })
        .then( data => {
            if (data === 1) {
                return res.status(200).json({ message: 'User has been deleted' })
            } else {
                return res.status(404).json({ message: 'User not found' })
            }
        } )
        .catch( err => {
            return res.status(500).json(err)
        } )
    }

    static async postLogin(req, res) {
        try {
            const { email, password } = req.body
            const user = await User.findOne({
                where: {
                    email: email
                }
            })

            if (!user) return res.status(401).json({
                message: 'Invalid email/ password'
            })
            
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
            } else return res.status(401).json({
                message: 'Invalid email/ password'
            })

        } catch (err) {
            console.log(err);
            return res.status(401).json(err)
        }
    }
}
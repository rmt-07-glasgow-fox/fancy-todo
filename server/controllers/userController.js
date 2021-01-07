const { OAuth2Client } = require('google-auth-library');
const { User } = require('../models')
const { isPasswordMatched } = require('../helpers/password')
const { generateToken } = require('../helpers/token')

class UserController {
    static async register(req, res, next) {
        try {
            let newUser = {
                email: req.body.email,
                password: req.body.password
            }
            // console.log(newUser)

            let created = await User.create(newUser)
            // console.log(created)
            let response = {
                id: created.id,
                email: created.email
            }

            return res.status(201).json(response)

        } catch (err) {
            // console.log(err)
            let errorMessage = err.errors ? err.errors.map(error => error.message) : err
            return res.status(400).json({ message: errorMessage })
        }
    }

    static async login(req, res, next) {
        try {
            let { email, password } = req.body

            let user = await User.findOne({ where: { email } })
            if (!user) return res.status(404).json({ message: 'Email / Password is invalid' })

            let passwordDB = user.password
            // console.log('>>>>> Password is ', isPasswordMatched(password, passwordDB))

            if (!isPasswordMatched(password, passwordDB)) {
                return res.status(200).json({ message: 'Email / Password is invalid' })
            }

            if (isPasswordMatched(password, passwordDB)) {
                const payload = {
                    id: user.id,
                    email: user.email
                }

                const access_token = generateToken(payload)
                return res.status(200).json({ access_token })
            }

        } catch (err) {
            let errorMessage = err.errors ? err.errors.map(error => error.message) : err
            return res.status(400).json({ message: errorMessage })
        }
    }

    static async loginGoogle(req, res, next) {
        try {
            // console.log('>>> body.id_token : ', req.body.id_token)
            const { id_token } = req.body
            const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID)
            const ticket = await client.verifyIdToken({
                idToken: id_token,
                audience: process.env.GOOGLE_CLIENT_ID
            });

            const payload = ticket.getPayload()
            console.log('>>> payload : ', payload)

            const email = payload.email
            const password = email.toString().split('@')
            password = password[0]

            console.log('>>> google email password : ', email, password)
            // res.status(200).send('success')

        } catch (err) {
            next(err.name = '')
        }
    }
}

module.exports = UserController
const { User } = require('../models')
const { comparePassword } = require('../helpers/bcrypt')
const { generateToken } = require('../helpers/jwt')

class Controller {
    static register(req, res, next) {
        const user = {
            email: req.body.email,
            password: req.body.password
        }

        User.create(user)
            .then(data => {
                const output = {
                    id: data.id,
                    email: data.email
                }

                res.status(200).json(output)
            })
            .catch(err => {
                //res.status(400).json(err.message)
                next({
                    message: 'Invalid email/password',
                    code: 400,
                    from: 'Controller User: register user'
                })
            })
    }

    static login(req, res, next) {
        const { email, password } = req.body

        User.findOne({
            where: { email }
        })
            .then(data => {
                if (!data) {
                    //res.status(401).json({ message: 'Invalid email/password' })
                    next({
                        message: 'Invalid email/password',
                        code: 401,
                        from: 'Controller User: login user'
                    })
                }

                const isValid = comparePassword(password, data.password)
                if (isValid) {
                    // kirim jwt
                    const payload = {
                        id: data.id,
                        email: data.email
                    }

                    const access_token = generateToken(payload)
                    res.status(200).json({ access_token })
                } else {
                    //res.status(401).json({ message: 'Invalid email/password' })
                    next({
                        message: 'Invalid email/password',
                        code: 401,
                        from: 'Controller User: login user'
                    })
                }

            })
            .catch(err => {
                //res.status(400).json(err.message)
                next({
                    message: err.message,
                    code: 400,
                    from: 'Controller User: login user'
                })
            })
    }
}

module.exports = Controller
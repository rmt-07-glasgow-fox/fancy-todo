const { compare } = require('../helpers/hashPassword')
const { generateToken } = require('../helpers/jwt')
const { User } = require('../models')

class Controller {
    static register(req, res, next) {
        const { email, password } = req.body
        User
            .create({email, password})
            .then(newUser => {
                const { id, email } = newUser
                res.status(201).json({id, email})
            })
            .catch(err => next(err))
    }

    static login(req, res, next) {
        const { email, password } = req.body
        User
            .findOne({
                where: {email}
            })
            .then(data => {
                if (compare(password, data.password)) {
                    const { id, email } = data
                    const access_token = generateToken({ id, email })
                    res.status(200).json({access_token})
                }else {
                    next({name: 'CustomError', statusCode: 400, message: 'Email or password wrong!'})
                }
            })
            .catch(err => next({name: 'CustomError', statusCode: 400, message: 'Email or password wrong!'}))
    }
}

module.exports = Controller
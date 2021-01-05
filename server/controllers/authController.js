const { compare } = require('../helpers/hashPassword')
const { generateToken } = require('../helpers/jwt')
const { User } = require('../models')

class Controller {
    static register(req, res) {
        const { email, password } = req.body
        User
            .create({email, password})
            .then(newUser => {
                const { id, email } = newUser
                res.status(201).json({id, email})
            })
            .catch(err => res.status(400).json(err))
    }

    static login(req, res) {
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
                    res.status(400).json({message: 'Email or password wrong!'})
                }
            })
            .catch(err => res.status(400).json({message: 'Email or password wrong!'}))
    }
}

module.exports = Controller
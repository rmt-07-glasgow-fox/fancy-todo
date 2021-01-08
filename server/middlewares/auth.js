const { cekToken } = require('../helpers/jwt')
const { User, Todo } = require('../models')

function authenticate(req, res, next) {
    try {
        let decoded = cekToken(req.headers.access_token)
        // console.log(decoded)
        User.findOne({
            where: {
                email: decoded.email
            }
        })
        .then(find => {
            if (!find) {
                res.status(401).json({ message: 'Please Login First'})
            } else {
                req.user = find
                next()
            }
        })
        .catch(err => {
            res.status(500).json({ message: 'Internal Server Error' })
        })
    } catch (err) {
        console.log(err)
        res.status(400).json({ message: err.message })
    }
}

function authorize(req, res, next) {
    Todo.findByPk(+req.params.id)
    .then (data => {
        if (!data || data.user_id !== req.user.id) {
            res.status(401).json({ message: 'Unauthorized'})
        } else {
            next()
        }
    })
    .catch(err => {
        res.status(500).json( {message: err.message })
    })
}

module.exports = { authenticate, authorize }
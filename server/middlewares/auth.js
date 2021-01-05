const { verifyToken } = require('../helpers/token')
const { User, Todo } = require('../models')

async function authenticate(req, res, next) {
    try {
        // console.log('>>> req.headers : ', req.headers)

        let decodedToken = verifyToken(req.headers.access_token)
        let user = await User.findOne({ where: { email: decodedToken.email } })
        // console.log('>>> decodedToken :', decodedToken)
        // console.log('>>> user :', user)

        if (!user) return res.status(401).json({ message: 'Please' })
        if (user) {
            req.user = { id: user.id }
            // console.log('>>> req.user : ', req.user)
            return next()
        }

    } catch (err) {
        return res.status(500).json({ message: err.message })
    }
}

async function authorize(req, res, next) {
    try {
        let id = +req.params.id
        // console.log('>>> id', id)
        // console.log('>>> req.user', req.user)

        let todo = await Todo.findByPk(id)
        // console.log(todo)
        if (!todo || todo.UserId !== req.user.id) return res.status(401).json({ message: `Bukan todo user id : ${req.user.id}` })
        if (todo) return next()

    } catch (err) {
        return res.send(500).json(err.message)
    }
}

module.exports = {
    authenticate, authorize
}
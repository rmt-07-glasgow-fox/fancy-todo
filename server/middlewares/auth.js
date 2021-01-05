const {checkToken} = require('../helpers/jwt')
const {User, Todo} = require('../models')

const authenticate = async (req, res, next) => {
    try {
        const decoded = await checkToken(req.headers.accesstoken)
        const find = await User.findOne({
            where: {
                email: decoded.email
            }
        })

        if (!find) {
            res.status(401).json({
                message: "Please register first!"
            })
        }
        else {
            req.user = {
                id: find.id
            }
            next()
        }
    }
    catch (err) {
        res.status(400).json({
            message: err.message
        })
    }
}

const authorize = (req, res, next) => {

    console.log(req.params)
    Todo.findOne({
        where: {
            id: +req.params.id
        }
    })
        .then(todo => {
            if (!todo || todo.UserId !== req.user.id) {
                res.status(401).json({
                    message: "not authorised."
                })
            }
            else {
                next()
            }
        })
        .catch(err => {
            res.status(500).json({message: err.message})
        })
}

module.exports = {
    authenticate, authorize
}


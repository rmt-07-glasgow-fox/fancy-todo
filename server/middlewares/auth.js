const { User, Todo } = require('../models')
const checkToken = require('../helpers/jwt.js').checkToken

async function authenticate(req, res, next) {
    try {
        const decoded = checkToken(req.headers.access_token)
        const found = await User.findByPk(decoded.id)
        
        if (!found) {
            return res.status(401).json({
                message: "Please login first"
            })
        } else {
            req.user = found.id
            next()
        }
    } catch (err) {
        return res.status(400).json({
            message: err.message
        })
    }
}

async function authorize(req, res, next) {
    try {
        console.log(req.params.id);
        const found = await Todo.findByPk(+req.params.id)
        if (!found) {
            return res.status(404).json({
                message: 'Todo not found'
            })
        } else {
            if (req.user === found.UserId) {
                next()
            } else {
                res.status(401).json({
                    message: 'Unauthorized to make a change of data'
                })
            }
        }
    } catch (err) {
        return res.status(500).json({
            message: err.message
        })
    }
}

module.exports = { 
    authenticate, authorize
}
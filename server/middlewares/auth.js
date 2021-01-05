const { User } = require('../models')
const checkToken = require('../helpers/jwt.js').checkToken

async function authentication(req, res, next) {
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

module.exports = { 
    authentication
}
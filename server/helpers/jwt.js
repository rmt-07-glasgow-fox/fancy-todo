const jwt = require('jsonwebtoken')
const SECRET_KEY = process.env.SECRET_KEY

module.exports = function generateToken(payload) {
    const token = jwt.sign(payload, SECRET_KEY)

    return token
}

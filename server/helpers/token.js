const jwt = require('jsonwebtoken')
const SECRET_KEY = process.env.KEY_TOKEN

function generateToken(payload) {
    return jwt.sign(payload, SECRET_KEY)
}

function verifyToken(token) {
    return jwt.verify(token, SECRET_KEY)
}

module.exports = {
    generateToken, verifyToken
}
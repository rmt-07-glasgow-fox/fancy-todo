const jwt = require('jsonwebtoken')

function generateToken(payload) {
    return jwt.sign(payload, 'testing')
}

function verifyToken(token) {
    return jwt.verify(token, 'testing')
}

module.exports = { generateToken, verifyToken }



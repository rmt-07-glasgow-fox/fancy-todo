const jwt = require('jsonwebtoken')

function getToken(data) {
    return jwt.sign(data, process.env.SECRET_TOKEN)
}

function verifyToken(token) {
    return jwt.verify(token, process.env.SECRET_TOKEN)
}

module.exports = {
    getToken, verifyToken
}
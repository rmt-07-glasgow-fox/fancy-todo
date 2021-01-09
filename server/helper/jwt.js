const jwt = require('jsonwebtoken')

function generateToken (userData) {
    const token = jwt.sign(userData, process.env.SECRET_KEY)
    return token
}

function cekToken (token) {
    return jwt.verify(token, process.env.SECRET_KEY)
}

module.exports = { generateToken, cekToken }
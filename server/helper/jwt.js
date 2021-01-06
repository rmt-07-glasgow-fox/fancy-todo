const jwt = require('jsonwebtoken')
// const SECRET_KEY = process.env.SECRET_KEY
const SECRET_KEY = 'makanenak'

function generateToken (userData) {
    const token = jwt.sign(userData, SECRET_KEY)
    return token
}

function cekToken (token) {
    return jwt.verify(token, SECRET_KEY)
}

module.exports = { generateToken, cekToken }
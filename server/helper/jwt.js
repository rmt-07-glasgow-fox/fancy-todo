const jwt = require('jsonwebtoken')
const SECRET_KEY = process.env.SECRET_KEY

function generateToken (userData) {
    const token = jwt.sign(userData, SECRET_KEY)
    return token
}

module.exports = { generateToken }
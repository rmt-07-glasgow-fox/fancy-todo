const jwt = require('jsonwebtoken')
const SECRET_CODE = process.env.SECRET_CODE

const generateToken = (payload) => {
    const token = jwt.sign(payload, SECRET_CODE)
    return token
}

module.exports = generateToken

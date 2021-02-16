const jwt = require("jsonwebtoken")
const SECRET_KEY = process.env.SECRET_KEY

function makeToken(payload) {
    const token = jwt.sign(payload, SECRET_KEY)
    return token
}

function validToken(token) {
    return jwt.verify(token, SECRET_KEY)
}

module.exports = {
    makeToken,
    validToken
}
const jwt = require ("jsonwebtoken")
const SECRET_KEY = process.env.SECRET_KEY

function getToken (payload) {
    const token = jwt.sign (payload, SECRET_KEY)
    return token
}

module.exports = {
    getToken
}
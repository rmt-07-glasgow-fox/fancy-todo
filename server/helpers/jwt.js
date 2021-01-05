const jwt = require('jsonwebtoken')
const SECRET_KEY = "pentol_ayam"

function genToken(payload) {
    let token = jwt.sign(payload, SECRET_KEY)
    return token
}

module.exports = {
    genToken
}
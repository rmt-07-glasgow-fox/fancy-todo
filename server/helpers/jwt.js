const jwt = require('jsonwebtoken')
const SECRET_KEY = 'belajar-coding'

function createToken(payload){
    const token = jwt.sign(payload, SECRET_KEY)
    return token
}

module.exports = {
    createToken
}
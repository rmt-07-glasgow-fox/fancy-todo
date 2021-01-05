const jwt = require('jsonwebtoken');
const SECRET_KEY = process.env.SECRET_KEY

const generateToken = (payload) => { //access_token
    return jwt.sign(payload, SECRET_KEY)
}

const cekToken = (token) => { //decoded
    return jwt.verify(token, SECRET_KEY)
}

module.exports = { generateToken, cekToken }
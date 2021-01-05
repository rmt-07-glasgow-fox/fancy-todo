const jwt = require("jsonwebtoken")
const SECRET_KEY = "todosecret15115021"

function generateToken(payload){
    const token = jwt.sign(payload, SECRET_KEY)
    return token
}

function tokenCheck(token){
    return jwt.verify(token, SECRET_KEY)
}

module.exports = { generateToken, tokenCheck }
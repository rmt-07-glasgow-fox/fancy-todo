const jwt = require("jsonwebtoken")
const SECRET_KEY = process.env.SECRET_KEY

function generateToken(params) {
    const token = jwt.sign(params, SECRET_KEY)
    return token
}


module.exports = {generateToken}
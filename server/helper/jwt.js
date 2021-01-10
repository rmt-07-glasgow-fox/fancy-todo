const jwt = require("jsonwebtoken")
const secretKey = process.env.SECRET

generateToken = (token) => {
  return jwt.sign(token, secretKey)
}

verifyToken = (token) => {
  return jwt.verify(token, secretKey)
}

module.exports = {generateToken, verifyToken}
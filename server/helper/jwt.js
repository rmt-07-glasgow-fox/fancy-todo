const jwt = require('jsonwebtoken')
const SECRET_KEY = process.env.SECRET_KEY

function generateToken (payload) {
  let token = jwt.sign(payload, SECRET_KEY)
  return token
}

function checkToken (token) {
  let verifiedToken = jwt.verify(token, SECRET_KEY)
  return verifiedToken
}

module.exports = {generateToken, checkToken};
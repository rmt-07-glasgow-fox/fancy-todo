const jwt = require('jsonwebtoken')
const SECRET_KEY = 'rahasia'

function generateToken(payload){
  const token = jwt.sign(payload, SECRET_KEY) //buat generate pwt, parameter pertama payload (data), yang kedua secret key
  return token
}

function cekToken(token){
  return jwt.verify(token, SECRET_KEY)
}

module.exports = { 
  generateToken,
  cekToken
}
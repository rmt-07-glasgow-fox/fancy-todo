const jwt = require('jsonwebtoken')
console.log(process.env.SECRET_KEY, '<<<<<<<<<<<')
const SECRET_KEY = process.env.SECRET_KEY


function generateToken(payload){ // return jwt.sign(payload, SECRET_KEY)
  const token = jwt.sign(payload, SECRET_KEY) //buat generate pwt, parameter pertama payload (data), yang kedua secret key
  return token
}

function cekToken(token){
  const verified = jwt.verify(token, SECRET_KEY)
  return verified
}

module.exports = { 
  generateToken,
  cekToken
}

const jwt = require("jsonwebtoken")
const SECRET_KEY = process.env.SECRET_KEY

function tokenGenerate(payLoad){
      const token = jwt.sign(payLoad, SECRET_KEY)
      return token
}

function tokenCheck(token) {
      const decoded = jwt.verify(token, SECRET_KEY)
      return decoded
}

module.exports = {tokenGenerate, tokenCheck}
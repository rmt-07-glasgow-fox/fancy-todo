const jwt = require('jsonwebtoken')

class jwtHelper {
  static generateToken(payload){
    console.log(payload)
    return jwt.sign(payload, process.env.JWT_SECRET)
  }
}

module.exports = jwtHelper
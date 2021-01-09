const {verifyToken} = require("../helper/jwt")

authenticate = (req, res, next) => {
  try {
    if (!req.headers.access_token) {
      throw {
        status: 400,
        message: `Login First`
      }
    } else {
      const decode = verifyToken(req.headers.access_token)
      if (!decode) {
        throw {
          status: 403,
          message: `User Invalid`
        }
      } else {
        req.user = decode
        next()
      }
    }
  } catch (err) {
    next (err)
  }
}

module.exports = {authenticate}
const {
  cekToken
} = require("../helpers/jwt")
const {
  User
} = require("../models")


const authentication = (req, res, next) => {
  try {
    let decoded = cekToken(req.headers.access_token)
    User.findOne({
      where: {
        email: decoded.email
      }
    })
    .then(data => {
      if (!data) {
        res.status(401).json({message: "please login first"})
      } else {
        next()
      }
    })
    .catch(err => {
      res.status(500).json({message: err.message})
    })
    
  } catch (err) {
    res.status(400).json({message: err.message})
  }
}
const authorization = (req, res, next) => {

}


module.exports = {
  authentication,
  authorization,
}
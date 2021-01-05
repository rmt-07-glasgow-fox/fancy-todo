const { User, ToDo } = require('../models')
const verifyToken = require('../helpers/jwtHelper').verifyToken

const authentication = async (req, res, next) => {
  try {
    if(req.headers.access_token){
      console.log(req.headers.access_token)
      let decryptedToken = verifyToken(req.headers.access_token)
      let user = await User.findOne({
        where: {
          email: decryptedToken.email
        }
      })
      if(user){
        req.userData = user
        next()
      } else {
          res.status(401).json({
            message: "Unauthorized. Please try fill in the correct login details."
          })
      }
    }else{
      res.status(401).json({
        message: "Unauthorized. Please try fill in the correct login details."
      })
    }
  } catch (err) {
    res.status(400).json({
      message: err.message
    })
  }

}

module.exports = {
  authentication
}
const { checkToken } = require('../helpers/jwt')
const { User } = require('../models')

function authentication (req, res, next) {
  try {
    const decoded = checkToken(req.headers.access_token)
    User.findOne({
      where: {
        email: decoded.email
      }
    })
      .then(find => {
        if (!find) {
          res.status(401).json({
            message: 'Please login first'
          })
        } else {
          req.user = find
          next()
        }
      })
      .catch(err => {
        res.status(500).json({
          message: err.message
        })
      })
  } catch (err) {
    console.log(err)
    res.status(400).json({
      message: err.message
    })
  }
}

module.exports = {
  authentication
}
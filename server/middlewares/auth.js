const { checkToken } = require('../helpers/jwt')
const { User } = require('../models')

const authenticate = ((req, res, next) => {
  try {
    const decoded = checkToken(req.headers.access_token)
    User.findOne({ where: { email: decoded.email } })
      .then(data => {
        if (!data) {
          res.status(401).json({ message: 'Please login first' })
        } else {

          req.user = {
            id: data.id
          }
          next()
        }
      })
      .catch(err => {
        res.status(500).json({ messsage: err.message })
      })
  } catch (err) {
    res.status(400).json({ message: err.message })
  }
})

module.exports = {
  authenticate
}
const { verifyToken } = require('../helpers/jwt');
const { User, Todo } = require('../models')

async function authenticate (req, res, next) {
  try {
    let verify = verifyToken(req.headers.access_token)
    let find = await User.findOne({ where: { email: verify.email}})
    if(!find) res.status(401).json({ message: 'Please Login First' })
    else {
      req.User = {
        id: find.id,
        email: find.email
      }
      next()
    }
  } catch (err) {
    res.status(400).json({
      message: err.message
    })
  }
}

async function authorize (req, res, next) {
  try {
    let find = await Todo.findOne({ where: { id: req.params.id}})
    if(!find) res.status(404).json({ message: 'Data Not Found' })
    else {
      if (find.UserId === req.User.id) next()
      else res.status(401).json({ message: 'UnAuthorize Data' })
    }
  } catch (err) {
    res.status(500).json({
      message: err.message
    })
  }
}
module.exports = {
  authenticate,
  authorize
}
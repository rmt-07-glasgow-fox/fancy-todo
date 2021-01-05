const { verifyToken } = require('../helpers/jwt');
const { User, Todo } = require('../models')

async function authenticate (req, res, next) {
  try {
    let verify = verifyToken(req.headers.access_token)
    let find = await User.findOne({ where: { email: verify.email}})
    if(!find) next({ code: 401, origin: 'authenticate'})
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
    if(!find) next({ code: 404 })
    else {
      if (find.UserId === req.User.id) next()
      else next({ code: 401})
    }
  } catch (err) {
    next({ code: 500})
  }
}
module.exports = {
  authenticate,
  authorize
}
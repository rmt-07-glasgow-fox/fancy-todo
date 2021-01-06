const { verifyToken } = require('../helpers/jwt')
const { User, ToDo } = require('../models')

async function authentication(req, res, next) {
  try {
    let decoded = verifyToken(req.headers.access_token)
    let user = await User.findOne({where: {email: decoded.email}})
    req.user = {id: user.id, email: user.email}
    next()
  } catch(err) {
    next({name: 'accessDenied'})
  }
}

async function authorization(req, res, next) {
  try {
    let todo = await ToDo.findOne({where: {id: +req.params.id}})
    if (todo.UserId !== req.user.id) {
      next({name: 'accessDenied'})
    } else {
      next()
    }
  } catch (err) {
    next({name: 'resourceNotFound'})
  }
}

module.exports = { authentication, authorization }


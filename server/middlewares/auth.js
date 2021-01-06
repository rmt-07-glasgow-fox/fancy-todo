const { verifyToken } = require('../helpers/jwt')
const { User, ToDo } = require('../models')

async function authentication(req, res, next) {
  try {
    let decoded =  verifyToken(req.headers.access_key)
    let user = await User.findOne({where: {email: decoded.email}})
    req.user = {id: user.id, email: user.email}
    next()
  } catch(err) {
    next(err)
  }
}

async function authorization(req, res, next) {
  try {
    let todo = await ToDo.findOne({where: {id: +req.params.id}})
    if (!todo) {
      console.log('todo siniii')
      next({name: 'resourceNotFound'})
    } else if (todo.UserId !== req.user.id) {
      next({name: 'accessDenied'})
    } else {
      next()
    }
  } catch (err) {
    next(err)
  }
}

module.exports = { authentication, authorization }


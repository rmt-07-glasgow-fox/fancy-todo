const { User, Todo } = require('../models')
const { checkToken } = require('../helpers/jwt')

const authenticate = async (req, res, next) => {
  try {
    let decoded = checkToken(req.headers.access_token)
    let user = await User.findOne({
      where: {
        email: decoded.email
      }
    })

    if(user) {
      req.user = user
      next()
    } else {
      next({ name: 'Forbidden' })
    }
  } catch(err) {
    next(err)
  }
}

const authorize = async (req, res, next) => {
  Todo.findByPk(req.params.id)
    .then(todo => {
      if(!todo) {
        next({ name: 'NotFound' })
      } else if(todo.UserId !== req.user.id) {
        next({ name: 'Unauthorized' })
      } else {
        next()
      }
    })
    .catch(err => {
      next(err)
    })
}

module.exports = {
  authenticate,
  authorize
}

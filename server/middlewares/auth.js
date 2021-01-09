const { checkToken } = require('../helpers/jwt')
const { User, Todo } = require('../models')

function authenticate(req, res, next) {
  try {
    let decoded = checkToken(req.headers.access_token)
    User.findOne({
      where: { email: decoded.email }
    })
    .then((find) => {
      if(!find){
        next({ name: 'needlogin'})
      } else {
        req.user = find
        next()
      }
    }).catch((err) => {
      next(err)
    })
  }
  catch(err) {
    next({ name: 'needlogin'})

  }
}

function authorize(req, res, next) {
  Todo.findOne({
    where: { id: req.params.id }
  })
  .then(data => {
    if(!data || data.user_id !== req.user.id) {
      next({ name: 'needAccess' })
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
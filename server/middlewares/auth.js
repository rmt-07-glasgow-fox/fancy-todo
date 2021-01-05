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
        res.status(401).json({ message: 'Please login first'})
      } else {
        req.user = find
        next()
      }
    }).catch((err) => {
      res.status(500).json({ message: err.message })
    })
  }
  catch(err) {
    res.status(400).json({ message: err.message })
  }
}

function authorize(req, res, next) {
  Todo.findOne({
    where: { id: req.params.id }
  })
  .then(data => {
    if(!data || data.user_id !== req.user.id) {
      res.status(401).json({ message: "You don't have access"})
    } else {
      next()
    }
  })
  .catch(err => {
    res.status(500).json({ message: err.message })
  })
}

module.exports = {
  authenticate,
  authorize
}
const { checkToken } = require('../helpers/jwt')
const { User, Todo } = require('../models')

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

const authorize = ((req, res, next) => {
  const todoId = +req.params.id

  Todo.findOne({
    where: { id: todoId }
  })
    .then(data => {
      if (!data || data.UserId !== req.user.id) {
        res.status(401).json({ message: 'Unauthorized' })
      } else {
        next()
      }
    })
    .catch(err => {
      res.status(500).json({ message: err.message })
    })
})

module.exports = {
  authenticate, authorize
}
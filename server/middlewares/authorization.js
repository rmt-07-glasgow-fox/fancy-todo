const { Todo } = require('../models')

function authorize(req, res, next) {
  const id = +req.params.id

  Todo.findOne({
    where: { id }
  })
    .then(todo => {
      if (todo.user_id !== req.user.id) {
        res.status(401).json({
          message: 'Invalid user, not authorized'
        })
      } else if (!todo) {
        res.status(404).json({
          message: 'User not found'
        })
      } else {
        next()
      }
    })
    .catch(err => {
      res.status(500).json({
        message: err.message
      })
    })
}

module.exports = {
  authorize
}

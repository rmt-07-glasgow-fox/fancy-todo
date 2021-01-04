const { Todo } = require('../models')

class TodoController {
  static getTodos (req, res) {
    Todo.findAll()
      .then(data => {
        res.status(200).json(data)
      })
      .catch(err => {
        res.status(500).json({message: 'internal server error'})
      })
  }
}

module.exports = TodoController
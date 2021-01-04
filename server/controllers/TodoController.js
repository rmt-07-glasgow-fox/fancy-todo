const { Todo } = require('../models')

class TodoController {
  static readTodo(req, res) {
    Todo.findAll({ attributes: { exclude: ['createdAt', 'updatedAt'] } })
      .then(data => {
        res.status(200).json(data)
      })
      .catch(err => {
        res.status(500).json({ messages: 'internal server error' })
      })
  }

  static createTodo(req, res) {
    const todoObj = {
      title: req.body.title,
      description: req.body.description,
      status: req.body.status,
      due_date: req.body.due_date
    }

    Todo.create(todoObj)
      .then(dataTodo => {
        res.status(201).json({ id: dataTodo.id, title: dataTodo.title, description: dataTodo.description, status: dataTodo.status, due_date: dataTodo.due_date })
      })
      .catch(err => {
        if (err) {
          res.status(400).json(err.message)
        }
        res.status(500).json({ messages: 'internal server eror' })
      })
  }
}

module.exports = TodoController
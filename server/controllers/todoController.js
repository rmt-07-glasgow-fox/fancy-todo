const { Todo } = require('../models')

class Controller {
  static addTodo (req, res) {
    const input = {
      title: req.body.title,
      description: req.body.description,
      status: false,
      due_date: req.body.due_date
    }
    Todo.create(input)
      .then(response => {
        res.status(201).json(response)
      })
      .catch(err => {
        res.status(500).json(err)
      })
  }

  static showAllTodo (req, res) {
    Todo.findAll()
      .then(response => {
        res.status(200).json(response)
      })
      .catch(err => {
        res.status(500).json(err)
      })
  }

  static showTodoByID (req, res) {
    const id = +req.params.id

    Todo.findByPk(id)
      .then(response => {
        res.status(200).json(response)
      })
      .catch(err => {
        res.status(500).json(err)
      })
  }

  static editTodo (req, res) {}

  static doneTodo (req, res) {}

  static deleteTodo (req, res) {}
}

module.exports = Controller;
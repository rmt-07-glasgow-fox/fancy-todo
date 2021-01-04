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

  static showAllTodo (req, res) {}

  static showTodoByID (req, res) {}

  static editTodo (req, res) {}

  static doneTodo (req, res) {}

  static deleteTodo (req, res) {}
}

module.exports = Controller;
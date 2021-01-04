const { Todo } = require('../models')

class ControllerTodo {
  static addTodo (req, res) {
    const input = {
      title: req.body.title,
      description: req.body.description,
      status: false,
      due_date: req.body.due_date
    }
    Todo.create(input)
      .then(response => {
        if (response) {
          res.status(201).json(response)
        } else {
          res.status(400).json({
            message: 'Validation Error'
          })
        }
      })
      .catch(err => {
        res.status(500).json(err.message)
      })
  }

  static showAllTodo (req, res) {
    Todo.findAll()
      .then(response => {
        res.status(200).json(response)
      })
      .catch(err => {
        res.status(500).json(err.message)
      })
  }

  static showTodoByID (req, res) {
    const id = +req.params.id

    Todo.findByPk(id)
      .then(response => {
        if (response) {
          res.status(200).json(response)
        } else {
          res.status(404).json({
            message: 'Data Not Found'
          })
        }
      })
      .catch(err => {
        res.status(500).json(err.message)
      })
  }

  static editTodo (req, res) {
    const id = +req.params.id;

    const input = {
      title: req.body.title,
      description: req.body.description,
      due_date: req.body.due_date
    }

    Todo.update(input, {
      where: { id }
    })
      .then(response => {
        if (response) {
          res.status(200).json({
            message: 'Data has been updated successfully'
          })
        } else {
          res.status(400).json({
            message: 'Validation errors'
          })
        }
      })
      .catch(err => {
        res.status(500).json(err.message)
      })
  }

  static doneTodo (req, res) {
    const id = +req.params.id

    const input = {
      status: true
    }

    Todo.update(input, {
      where: { id }
    })
      .then(response => {
        if (response) {
          res.status(200).json({
            message: 'Data has been updated successfully'
          })
        } else {
          res.status(400).json({
            message: 'Validation errors'
          })
        }
      })
      .catch(err => {
        res.status(500).json(err.message)
      })
  }

  static deleteTodo (req, res) {
    const id = +req.params.id

    Todo.destroy({
      where: { id }
    })
      .then(response => {
        if (response) {
          res.status(200).json({
            message: 'Todo success to delete'
          })
        } else {
          res.status(404).json({
            message: 'Error not found'
          })
        }
      })
      .catch(err => {
        res.status(500).json(err.message)
      })
  }
}

module.exports = ControllerTodo;
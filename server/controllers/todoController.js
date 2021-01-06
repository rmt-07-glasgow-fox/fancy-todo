const { Todo } = require('../models')

class ControllerTodo {
  static addTodo (req, res) {
    const input = {
      title: req.body.title,
      description: req.body.description,
      status: req.body.status || false,
      due_date: req.body.due_date,
      user_id: req.user.id
    }
    Todo.create(input)
      .then(response => {
        res.status(201).json(response)
      })
      .catch(err => {
        if (err.errors.length) {
          const outputErr = []

          err.errors.forEach(errors => {
            outputErr.push(errors.message)
          })

          res.status(400).json({
            message: outputErr.join(', ')
          })
        } else {
          res.status(500).json({
            message: 'Internal Server Error'
          })
        }
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
      due_date: req.body.due_date,
      status: req.body.status
    }

    Todo.update(input, {
      where: { id },
      returning: true
    })
      .then(response => {
        if (response[0] > 0) {
          res.status(200).json(response[1])
        } else {
          res.status(404).json({
            message: 'Error not found'
          })
        }
      })
      .catch(err => {
        if (err.errors.length) {
          const outputErr = []

          err.errors.forEach(errors => {
            outputErr.push(errors.message)
          })

          res.status(400).json({
            message: outputErr.join(', ')
          })
        } else {
          res.status(500).json({
            message: 'Internal Server Error'
          })
        }
      })
  }

  static doneTodo (req, res) {
    const id = +req.params.id

    const input = {
      status: req.body.status
    }

    Todo.update(input, {
      where: { id },
      returning: true
    })
      .then(response => {
        res.status(200).json(response)
      })
      .catch(err => {
        if (err.errors.length) {
          const outputErr = []

          err.errors.forEach(errors => {
            outputErr.push(errors.message)
          })

          res.status(400).json({
            message: outputErr.join(', ')
          })
        } else {
          res.status(500).json({
            message: 'Internal Server Error'
          })
        }
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
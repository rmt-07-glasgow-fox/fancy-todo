const { Todo } = require('../models')

class ControllerTodo {
  static addTodo (req, res, next) {
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
          next(err)
        } else {
          next(err)
        }
      })
  }

  static showAllTodo (req, res, next) {
    Todo.findAll()
      .then(response => {
        res.status(200).json(response)
      })
      .catch(err => {
        next(err)
      })
  }

  static showTodoByID (req, res, next) {
    const id = +req.params.id

    Todo.findByPk(id)
      .then(response => {
        if (response) {
          res.status(200).json(response)
        } else {
          next({
            name: 'Data not found'
          })
        }
      })
      .catch(err => {
        next(err)
      })
  }

  static editTodo (req, res, next) {
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
          next({
            name: 'Data not found'
          })
        }
      })
      .catch(err => {
        if (err.errors.length) {
          next(err)
        } else {
          next(err)
        }
      })
  }

  static doneTodo (req, res, next) {
    const id = +req.params.id

    const input = {
      status: req.body.status
    }

    Todo.update(input, {
      where: { id },
      returning: true
    })
      .then(response => {
        res.status(200).json(response[1])
      })
      .catch(err => {
        if (err.errors.length) {
          next(err)
        } else {
          next(err)
        }
      })
  }

  static deleteTodo (req, res, next) {
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
          next({
            name: 'Data not found'
          })
        }
      })
      .catch(err => {
        next(err)
      })
  }
}

module.exports = ControllerTodo;
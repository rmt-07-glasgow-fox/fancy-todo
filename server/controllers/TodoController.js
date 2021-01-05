const { RSA_NO_PADDING, ESRCH } = require('constants')
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
      due_date: req.body.due_date,
      UserId: req.user.id
    }

    Todo.create(todoObj)
      .then(data => {
        res.status(201).json({ id: data.id, title: data.title, description: data.description, status: data.status, due_date: data.due_date })
      })
      .catch(err => {
        if (err) {
          res.status(400).json({ messages: err.message })
        }
        res.status(500).json({ message: 'internal server eror' })
      })
  }

  static getTodoById(req, res) {
    const todoId = +req.params.id

    Todo.findByPk(todoId, { attributes: { exclude: ['createdAt', 'updatedAt'] } })
      .then(data => {
        if (data) {
          res.status(200).json(data)
        } else {
          res.status(404).json({ message: 'Todo not found' })
        }
      })
      .catch(err => {
        res.status(500).json({ message: 'internal server error' })
      })
  }

  static updateTodoPut(req, res) {
    const todoId = +req.params.id

    const updateTodo = {
      title: req.body.title,
      description: req.body.description,
      status: req.body.status,
      due_date: req.body.due_date
    }

    Todo.update(updateTodo, {
      where: {
        id: todoId
      },
      returning: true
    })
      .then(data => {
        if(data[0] === 0) {
          res.status(404).json({ message: 'Todo not found' })
        } else {
          res.status(200).json({ id: data[1][0].id, title: data[1][0].title, description: data[1][0].description, status: data[1][0].status, due_date: data[1][0].due_date })
        }
      })
      .catch(err => {
        if (err) {
          res.status(400).json({ message: err.message })
        }
        res.status(500).json({ message: 'internal server error' })
      })
  }

  static updateTodoPatch(req, res) {
    const todoId = +req.params.id

    const updateTodo = {
      status: req.body.status
    }

    Todo.update(updateTodo, {
      where: {
        id: todoId
      },
      returning: true
    })
      .then(data => {
        if (data[0] === 0) {
          res.status(404).json({ message: 'Todo not found' })
        } else {
          res.status(200).json({ id: data[1][0].id, title: data[1][0].title, description: data[1][0].description, status: data[1][0].status, due_date: data[1][0].due_date })
        }
      })
      .catch(err => {
        if (err) {
          res.status(400).json({ message: err.message })
        }

        res.status(500).json({ message: 'internal server error' })

      })
  }

  static deleteTodo(req, res) {
    const todoId = +req.params.id
    Todo.destroy({ where: { id: todoId } })
      .then(data => {
        if (data === 1) {
          res.status(200).json({ message: 'todo success to delete' })
        } else {
          res.status(404).json({ message: 'Todo not found' })
        }
      })
      .catch(err => {
        res.status(500).json({ message: 'internal server error' })
      })
  }
}

module.exports = TodoController
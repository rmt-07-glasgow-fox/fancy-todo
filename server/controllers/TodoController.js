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
      due_date: req.body.due_date
    }

    Todo.create(todoObj)
      .then(data => {
        res.status(201).json({ id: data.id, title: data.title, description: data.description, status: data.status, due_date: data.due_date })
      })
      .catch(err => {
        if (err) {
          res.status(400).json(err.message)
        }
        res.status(500).json({ messages: 'internal server eror' })
      })
  }

  static getTodoById(req, res) {
    const todoId = +req.params.id

    Todo.findByPk(todoId)
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
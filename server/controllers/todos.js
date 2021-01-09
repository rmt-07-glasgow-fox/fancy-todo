const { Todo } = require('../models')
const { sendMail } = require('../services/mailgun')

class Controller {

  static createTodo(req, res, next) {
    let { title, description, status, due_date } = req.body
    let input = {
      title,
      description,
      status,
      due_date,
      UserId: req.user.id
    }
    let todo

    Todo.create(input)
      .then( result => {
        let { title, description, status, due_date } = result
        todo = { title, description, status, due_date }

        return sendMail(req.user, todo)
      })
      .then( result => {
        res.status(201).json(todo)
      })
      .catch( err => {
        next(err)
      })
  }

  static getTodos(req, res, next) {
    Todo.findAll({
      attributes: {
        exclude: ['createdAt', 'updatedAt']
      },
      where: {
        UserId: req.user.id
      }
    })
      .then( todos => {
        res.status(200).json(todos)
      })
      .catch( err => {
        next(err)
      })
  }

  static getTodoById(req, res, next) {
    let id = req.params.id
    Todo.findByPk(id, {
      attributes: {
        exclude: ['createdAt', 'updatedAt']
      }
    })
      .then( todo => {
        if (todo) {
          res.status(200).json(todo)
        } else {
          next({ name: 'NotFound' })
        }
      })
      .catch( err => {
        next(err)
      })
  }

  static putTodoById(req, res, next) {
    let id = req.params.id
    let { title, description, status, due_date } = req.body

    Todo.findByPk(id, {
      attributes: {
        exclude: ['createdAt', 'updatedAt']
      }
    })
      .then( todo => {
        if (todo) {
          todo.title = title
          todo.description = description
          todo.status = status
          todo.due_date = due_date
          return todo.save()
        } else {
          next({ name: 'NotFound' })
        }
      })
      .then( newTodo => {
        res.status(200).json(newTodo)
      })
      .catch( err => {
        next(err)
      })
  }

  static updateTodoStatus(req, res, next) {
    let id = req.params.id
    let status = req.body.status

    Todo.findByPk(id)
      .then( todo => {
        if(todo) {
          todo.status = status
          return todo.save()
        } else {
          next({ name: 'NotFound' })
        }
      })
      .then( todo => {
        res.status(200).json(todo)
      })
      .catch( err => {
        next(err)
      })
  }

  static deleteTodoById(req, res, next) {
    let id = req.params.id

    Todo.findByPk(id)
      .then( todo => {
        if(todo) {
          return todo.destroy()
        } else {
          next({ name: 'NotFound' })
        }
      })
      .then( result => {
        res.status(200).json({ message: 'todo success to delete' })
      })
      .catch( err => {
        next(err)
      })
  }
}

module.exports = Controller

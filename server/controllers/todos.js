const { Todo } = require('../models')

class Controller {

  static createTodo(req, res) {
    let { title, description, status, due_date } = req.body
    let input = { title, description, status, due_date }

    Todo.create(input)
      .then( todo => {
        let { title, description, status, due_date } = todo
        res.status(201).json({ title, description, status, due_date })
      })
      .catch( err => {
        if (err.errors) {
          res.status(400).json({ validationErrors: err.errors.map( error => error.message )})
        } else {
          console.log(err)
          res.status(500).json({ message: 'Server Error'})
        }
      })
  }

  static getTodos(req, res) {
    Todo.findAll({
      attributes: {
        exclude: ['createdAt', 'updatedAt']
      }
    })
      .then( todos => {
        res.status(200).json(todos)
      })
      .catch( err => {
        res.status(500).json({ message: 'Server Error'})
      })
  }

  static getTodoById(req, res) {
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
          res.status(404).json({ message: 'Todo not found'})
        }
      })
      .catch( err => {
        res.status(500).json({ message: 'Server Error'})
      })
  }

  static putTodoById(req, res) {
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
          res.status(404).json({ message: 'Todo not found' })
        }
      })
      .then( newTodo => {
        console.log(newTodo)
        res.status(200).json(newTodo)
      })
      .catch( err => {
        if (err.errors) {
          res.status(400).json({ validationErrors: err.errors.map( error => error.message )})
        } else {
          console.log(err)
          res.status(500).json({ message: 'Server Error'})
        }
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
        if (err.errors) {
          res.status(400).json({ validationErrors: err.errors.map( error => error.message )})
        } else {
          console.log(err)
          res.status(500).json({ message: 'Server Error'})
        }
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
        if (err.errors) {
          res.status(400).json({ validationErrors: err.errors.map( error => error.message )})
        } else {
          console.log(err)
          res.status(500).json({ message: 'Server Error'})
        }
      })
  }
}

module.exports = Controller

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
    let input = { title, description, status, due_date }

    Todo.findByPk(id, {
      attributes: {
        exclude: ['createdAt', 'updatedAt']
      }
    })
      .then( todo => {
        if (todo) {
          return todo.save(input)
        } else {
          res.status(404).json({ message: 'Todo not found' })
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
}

module.exports = Controller

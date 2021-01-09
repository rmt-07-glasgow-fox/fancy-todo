const { Todo, User } = require('../models')

class TodoController {
  static readTodo(req, res, next) {
    Todo.findAll({ attributes: { exclude: ['createdAt', 'updatedAt'] } })
      .then(data => {
        if (data) {
          res.status(200).json(data)
        } else {
          res.status(404).json({ message: 'Todo not found' })
        }
      })
      .catch(err => {
        next(err)
      })
  }

  static createTodo(req, res, next) {
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
        next(err)
      })
  }

  static getTodoById(req, res, next) {
    const todoId = +req.params.id

    Todo.findByPk(todoId, { 
      attributes: { 
        exclude: ['createdAt', 'updatedAt'] 
      },
      include: User
    })
      .then(data => {
        console.log(data)
        if (data) {
          res.status(200).json(data)
        } else {
          res.status(404).json({ message: 'Todo not found' })
        }
      })
      .catch(err => {
        next(err)
      })
  }

  static updateTodoPut(req, res, next) {
    const todoId = +req.params.id

    const updateTodo = {
      title: req.body.title,
      description: req.body.description,
      status: req.body.status,
      due_date: req.body.due_date,
      UserId: req.user.id
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
        next(err)
      })
  }

  static updateTodoPatch(req, res, next) {
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
        next(err)
      })
  }

  static deleteTodo(req, res, next) {
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
        next(err)
      })
  }
}

module.exports = TodoController


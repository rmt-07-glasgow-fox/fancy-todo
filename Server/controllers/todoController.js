const { Todo } = require('../models')

class TodoController {
  static getTodo(req, res, next) {
    Todo.findAll({
      attributes: {exclude: ['updatedAt', 'createdAt']}
    })
    .then(data=> {
      res.status(200).json(data)
    })
    .catch(err => {
      next({ code: 500 })
    })
  }
  static postTodo(req, res, next) {
    let param = {
      title: req.body.title,
      description: req.body.description,
      status: req.body.status,
      due_date: req.body.due_date,
      UserId: req.body.UserId
    }
    Todo.create(param)
    .then(data => {
      let out = {
        title: data.title,
        description: data.description,
        status: data.status,
        due_date: data.due_date,
        UserId: data.UserId
      }
      res.status(201).json(out)
    })
    .catch(err => {
      if (err.name) next ({ code: 400, msg: err.message})
      else next({ code: 500 })
    })
  }
  static getTodoById(req, res, next) {
    Todo.findOne({
      where: {
        id: req.params.id
      }
    })
    .then(data=> {
      if (data) res.status(200).json(data)
      else next({ code: 404 })
    })
    .catch(err => {
      next({ code: 500 })
    })
  }
  static putTodo(req, res, next) {
    let param = {
      title: req.body.title,
      description: req.body.description,
      status: req.body.status,
      due_date: req.body.due_date
    }
    Todo.update(param, {
      where: {
        id: req.params.id
      },
      returning: true
    })
    .then(data => {
      if(data[0] === 0) return next({ code: 404 })
      let out = {
        title: data[1][0].title,
        description: data[1][0].description,
        status: data[1][0].status,
        due_date: data[1][0].due_date
      }
      res.status(200).json(out)
    })
    .catch(err => {
      if (err.name) next ({ code: 400, msg: err.message})
      else next({ code: 500 })
    })
  }
  static patchTodo(req, res, next) {
    let param = {
      status: req.body.status
    }
    Todo.update(param, {
      where: {
        id: req.params.id
      },
      returning: true
    })
    .then(data => {
      if(data[0] === 0) return next({ code: 404 })
      let out = {
        title: data[1][0].title,
        description: data[1][0].description,
        status: data[1][0].status,
        due_date: data[1][0].due_date
      }
      res.status(200).json(out)
    })
    .catch(err => {
      if (err.name) next ({ code: 400, msg: err.message})
      else next({ code: 500 })
    })
  }
  static deleteTodo(req, res, next) {
    Todo.destroy({
      where: {
        id: req.params.id
      },
      returning: true
    })
    .then(data=> {
      if(data === 0) return next({ code: 404 })
      else res.status(200).json({
        message: 'todo success to delete'
      })
    })
    .catch(err => {
      next({ code: 500 })
    })
  }
}
module.exports = TodoController
const { Todo } = require('../models')

class TodoController {
  static getTodo(req, res) {
    Todo.findAll({})
    .then(data=> {
      res.status(200).json(data)
    })
    .catch(err => {
      res.status(500).json({
        msg: 'Error'
      })
    })
  }
  static postTodo(req, res) {
    let param = {
      title: req.body.title,
      description: req.body.description,
      status: req.body.status,
      due_date: req.body.due_date
    }
    Todo.create(param)
    .then(data => {
      let out = {
        title: data.title,
        description: data.description,
        status: data.status,
        due_date: data.due_date
      }
      res.status(201).json(out)
    })
    .catch(err => {
      if (err.name === "SequelizeValidationError") res.status(400).json({
        msg: err.message
      })
      else res.status(500).json({
        msg: err.message
      })
    })
  }
  static getTodoById(req, res) {
    Todo.findOne({
      where: {
        id: req.params.id
      }
    })
    .then(data=> {
      if (data) res.status(200).json(data)
      else res.status(404).json({
        msg: 'Data Not Found'
      })
    })
    .catch(err => {
      res.status(500).json({
        msg: 'Error'
      })
    })
  }
  static putTodo(req, res) {
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
      if(data[0] === 0) return res.status(404).json({
        msg: 'Data Not Found'
      })
      let out = {
        title: data[1][0].title,
        description: data[1][0].description,
        status: data[1][0].status,
        due_date: data[1][0].due_date
      }
      res.status(201).json(out)
    })
    .catch(err => {
      if (err.name === "SequelizeValidationError") res.status(400).json({
        msg: err.message
      })
      else res.status(500).json({
        msg: err.message
      })
    })
  }
  static patchTodo(req, res) {
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
      if(data[0] === 0) return res.status(404).json({
        msg: 'Data Not Found'
      })
      let out = {
        title: data[1][0].title,
        description: data[1][0].description,
        status: data[1][0].status,
        due_date: data[1][0].due_date
      }
      res.status(201).json(out)
    })
    .catch(err => {
      if (err.name === "SequelizeValidationError") res.status(400).json({
        msg: err.message
      })
      else res.status(500).json({
        msg: err.message
      })
    })
  }
  static deleteTodo(req, res) {
    Todo.destroy({
      where: {
        id: req.params.id
      },
      returning: true
    })
    .then(data=> {
      if(data === 0) return res.status(404).json({
        msg: 'Data Not Found'
      })
      else res.status(200).json({
        message: 'todo success to delete'
      })
    })
    .catch(err => {
      res.status(500).json({
        msg: 'Error'
      })
    })
  }
}
module.exports = TodoController
const {Todo} = require('../models')

class TodosController {
  static create(req, res) {
    let { title, description, status, due_date } = req.body
    let todo = {
      title: title,
      description: description,
      status: status,
      due_date: due_date
    }
    
    Todo.create(todo)
    .then((todo) => {
      res.status(201).json({
        msg: 'Successfuly create new To Do!'
      })
    })
    .catch((error) => {
      res.status(400).json(error, {
        msg: 'Invalid create new To Do'
      })
    })
  }

  static index(req, res) {

    Todo.findAll()
    .then((todos) => {
      res.status(200).json(todos)
    })
    .catch((error) => {
      res.status(400).json(error)
    })
  }

  static show(req, res) {
    Todo.findByPk({where: {id: +req.params.id}})
    .then((todo) => {
      res.status(200).json(todo)
    })
    .catch((error) => {
      res.status(400).json(error)
    })
  }

  static updatePut(req, res) {
    Todo.update({where: {id: +req.params.id}})
    .then((todo) => {
      res.status(200).json(todo)
    })
    .catch((error) => {
      res.status(400).json(error)
    })
  }

  static updatePatch(req, res) {
    Todo.update({where: {id: +req.params.id}})
    .then((todo) => {
      res.status(200).json(todo)
    })
    .catch((error) => {
      res.status(400).json(erorr)
    })
  }

  static destroy(req, res) {
    Todo.destroy({where: {id: +req.params.id}})
    .then((todo) => {
      res.status(200).json(todo, {
        msg: `Todo list ${todo.title} has been deleted!`
      })
    })
    .catch((error) => {
      res.status(400).json(error)
    })
  }

}

module.exports = TodosController
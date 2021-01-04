const {Todo} = require ('../models/index')

class ToDoController {
  static getTodos (req, res) {
    Todo.findAll()
      .then (data => {
        res.status(200).json(data)
      })
      .catch (err => {
        res.status(500).json({message: 'internal server error'})
      })
  }
  static createTodos (req, res) {
    let obj = {
      title: req.body.title,
      description: req.body.description,
      status: req.body.status,
      due_date: req.body.due_date
    }
    Todo.create (obj)
      .then (data => {
        res.status(201).json(data)
      })
      .catch (err => {

      })
  }
}

module.exports = ToDoController
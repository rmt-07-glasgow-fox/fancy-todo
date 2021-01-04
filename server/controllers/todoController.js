const {
  Todo
} = require("../models")

class TodoController {
  static createTask (req, res) {
    let data = {
      title: req.body.title,
      description: req.body.description,
      status: req.body.status,
      due_date: req.body.due_date,
    }
    Todo.create(data)
    .then(out => {
      res.status(201).json(out)
    })
    .catch(err => {
      if (err.message == "Date must be greater than today") {
        res.status(400).json({message: "due date must be today or after today"})
      } else {
        res.status(500).json({message: err})
      }
    })
  }

  static getAllTask (req, res) {
    Todo.findAll()
    .then(data => {
      res.status(200).json(data)
    })
    .catch(err => {
      res.status(500).json({message: err.message})
    })
  }

  static getOneTask (req, res) {
    let id = req.params.id
    Todo.findByPk(id)
    .then(data => {
      if (data) {
        res.status(201).json(data)
      } else if (data) {
        res.status(400).json({message: "due date must be today or after today"})
      } else if (!data) {
        res.status(404).json({message: "data not found"})
      }
    })
    .catch(err => {
      res.status(500).json({message: "server error"})
    })

  }

  static updateTask (req, res) {

  }

  static modifyTask (req, res) {

  }

  static deleteTask (req, res) {

  }
}

module.exports = TodoController
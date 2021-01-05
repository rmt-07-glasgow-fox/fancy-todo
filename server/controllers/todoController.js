const {
  Todo
} = require("../models")

class TodoController {
  static createTask (req, res) {
    let input = {
      title: req.body.title,
      description: req.body.description,
      status: req.body.status,
      due_date: req.body.due_date,
      userId: req.user.id
    }
    Todo.create(input)
    .then(data => {
      res.status(201).json(data)
    })
    .catch(err => {
      if (err.name === "SequelizeValidationError") {
        res.status(400).json({message: "Date must be greater than today"})
      } else {
        res.status(500).json({message: "server error"})
      }
    })
  }

  static getAllTask (req, res) {
    Todo.findAll({
      order: [["id", "ASC"]]
    })
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
        res.status(200).json(data)
      } else if (!data) {
        res.status(404).json({message: "data not found"})
      }
    })
    .catch(err => {
      res.status(500).json({message: "server error"})
    })
  }

  static updateTask (req, res) {
    let id = req.params.id
    let input = {
      title: req.body.title,
      description: req.body.description,
      status: req.body.status,
      due_date: req.body.due_date,
    }
    Todo.update(input, {
      where: {id}
    })
    .then(data => {
      if (data == 0) {
        res.status(404).json({message: "data not found"})
      } else {
        res.status(200).json( {...{id: id}, ...input})
      }
    })
    .catch(err => {
      if (err.name === "SequelizeValidationError") {
        res.status(400).json({message: "Date must be greater than today"})
      } else {
        res.status(500).json({message: "server error"})
      }
    })
  }

  static modifyTask (req, res) {
    let id = req.params.id
    let status = req.body.status
  
    Todo.findByPk(id)
    .then(data => {
      if (!data) {
        return res.status(404).json({message: "data not found"})
      } else {
        data.status = status
        return data.save()
      }
    })
    .then(data2 => {
      return res.status(200).json(data2)
    })
    .catch(err => {
      if (err.name === "SequelizeValidationError") {
        res.status(400).json({message: "Date must be greater than today"})
      } else {
        res.status(500).json({message: err.message})
      }
    })
  }

  static deleteTask (req, res) {
    let id = req.params.id
    Todo.destroy({
      where: {
        id
      }
    })
    .then(data => {
      if (data == 0) {
        res.status(404).json({message: "data not found"})
      } else {
        res.status(200).json({message: "todo success to delete"})
      }
    })
    .catch(err => {
        res.status(500).json({message: "server error"})
    })
  }
}

module.exports = TodoController
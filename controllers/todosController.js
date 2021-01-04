const { Todo } = require('../models')

class todosController {

  static createTodos(req, res) {
    const { title, description, status, due_date } = req.body
    let input = {title, description, status, due_date}

    Todo.create((input))
    .then(() => {
      res.status(200).json(input)
    })
    .catch((err) => {
      if (err.name == "SequelizeValidationError") {
        return res.status(400).json(err, {message: "Validation error!"})
      }
      res.status(500).json({message: "Internal error!"})
    })
  }

  static showTodos(req, res) {
    Todo.findAll()
    .then((data) => {
      res.status(200).json(data)
    })
    .catch((err) => {
      res.status(500).json({message: "Internal error!"})
    })
  }

  static showTodosById(req, res) {
    let id = +req.params.id
    Todo.findByPk(id)
    .then((data) => {
      if (data == null) {return res.status(404).json({message: "404: error not found"})}
      res.status(200).json(data)
    })
    .catch((err) => {
      res.status(500).json({message: "Internal error!"})
    })
  }

  static putTodosById(req, res) {
    let id = +req.params.id // this id will be updated with the data 'input'

    //get this data from client
    const { title, description, status, due_date } = req.body
    let input = {title, description, status, due_date}

    Todo.update(input, {where:{id:id}})
    .then((data) => {
      //if ID is not found, the server will return with a value of 0
      if (data == 0) {return res.status(404).json({message: "404: error not found"})}
      res.status(200).json(input)
    })
    .catch((err) => {
      if (err.name == "SequelizeValidationError") {
        return res.status(400).json(err, {message: "Validation error!"})
      }
      res.status(500).json(err, {message: "Internal error!"})
    })
  }

  static patchTodosById(req, res) {
    let id = +req.params.id // this id will be updated with the data 'input'

    //get this data from client
    const { status } = req.body

    Todo.update({status:status}, {where:{id:id}})
    .then((data) => {
      //if ID is not found, the server will return with a value of 0
      if (data == 0) {return res.status(404).json({message: "404: error not found"})}
      return Todo.findByPk(id)
    })
    .then((data) => {
      res.status(200).json(data)
    })
    .catch((err) => {
      if (err.name == "SequelizeValidationError") {
        return res.status(400).json(err, {message: "Validation error!"})
      }
      res.status(500).json(err, {message: "Internal error!"})
    })
  }

  static deleteTodosById(req, res) {
    let id = +req.params.id // this id will be deleted

    Todo.destroy({where:{id:id}})
    .then((data) => {
      //if ID is not found, the server will return with a value of 0
      if (data == 0) {return res.status(404).json({message: "404: error not found"})}
      res.status(200).json({message:"todo success to delete"})
    })
    .catch((err) => {
      res.status(500).json(err, {message: "Internal error!"})
    })
  }


}

module.exports = todosController
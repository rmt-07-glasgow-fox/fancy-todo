const {
  Todo
} = require("../models")

class TodoController {
  static createTask (req, res, next) {
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
      next(err)
    })
  }

  static getAllTask (req, res, next) {
    Todo.findAll({
      where: {
        userId: req.user.id
      },
      order: [["id", "ASC"]]
    })
    .then(data => {
      res.status(200).json(data)
    })
    .catch(err => {
      next(err)
    })
  }

  static getOneTask (req, res, next) {
    let id = req.params.id
    Todo.findByPk(id)
    .then(data => {
      if (data) {
        res.status(200).json(data)
      } else if (!data) {
        next({message: "resourceNotFound"})
      }
    })
    .catch(err => {
      next(err)
    })
  }

  static updateTask (req, res, next) {
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
        next({name: "resourceNotFound"})
      } else {
        res.status(200).json( {...{id: id}, ...input})
      }
    })
    .catch(err => {
      next(err)
    })
  }

  static modifyTask (req, res, next) {
    let id = req.params.id
    let status = req.body.status
  
    Todo.findByPk(id)
    .then(data => {
      if (!data) {
        next({name: "resourceNotFound"})
      } else {
        data.status = status
        return data.save()
      }
    })
    .then(data2 => {
      return res.status(200).json(data2)
    })
    .catch(err => {
      next(err)
    })
  }

  static deleteTask (req, res, next) {
    let id = req.params.id
    Todo.destroy({
      where: {
        id
      }
    })
    .then(data => {
      if (data == 0) {
        next({message: "resourceNotFound"})
      } else {
        res.status(200).json({message: "todo success to delete"})
      }
    })
    .catch(err => {
      next(err)
    })
  }
}

module.exports = TodoController
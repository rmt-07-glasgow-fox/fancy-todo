const { ToDo } = require('../models')

class Controller {
  static createToDo(req, res) {
    let objToDo = { 
      title: req.body.title, 
      description: req.body.description, 
      status: req.body.status, 
      due_date: req.body.due_date 
    }
    ToDo.create(objToDo)
    .then(data => {
      res.status(201).json(data)
    })
    .catch(err => {
      if (err.name === 'SequelizeValidationError') {
        res.status(400).json({message: 'Can not choose date in the past'})
      } else {
        res.status(500).json({message: 'internal server error'})
      }
    })
  }

  static showToDos(req, res) {
    ToDo.findAll()
    .then(data => {
      res.status(200).json(data)
    })
    .catch(() => {
      res.status(500).json({message: 'internal server error'})
    })
  }

  static showToDoById(req, res) {
    let id = +req.params.id
    ToDo.findByPk(id)
    .then(data => {
      if (data) {
        res.status(200).json(data)
      } else {
        res.status(404).json({message: 'error not found'})
      }
    })
    .catch(() => {
      res.status(500).json({message: 'internal server error'})
    })
  }

  static editToDo(req, res) {
    let id = +req.params.id
    let objToDo = { 
      title: req.body.title, 
      description: req.body.description, 
      status: req.body.status, 
      due_date: req.body.due_date 
    }
    ToDo.update(objToDo, {where: {id}})
    .then(() => {
      return ToDo.findByPk(id)
    })
    .then(data => {
      if (data) {
        res.status(200).json(data)
      } else {
        res.status(404).json({message: 'error not found'})
      }
    })
    .catch(err => {
      if (err.name === 'SequelizeValidationError') {
        res.status(400).json({message: 'Can not choose date in the past'})
      } else {
        res.status(500).json({message: 'internal server error'})
      }
    })
  }

  static patchStatus(req, res) {
    let id = +req.params.id
    let status = {status: req.body.status}
    ToDo.update(status, {where: {id}})
    .then(() => {
      return ToDo.findByPk(id)
    })
    .then(data => {
      if (data) {
        res.status(200).json(data)
      } else {
        res.status(404).json({message: 'error not found'})
      }
    })
    .catch(err => {
      if (err.name === 'SequelizeValidationError') {
        res.status(400).json({message: 'Can not choose date in the past'})
      } else {
        res.status(500).json({message: 'internal server error'})
      }
    })
  }

  static deleteToDo(req, res) {
    let id = +req.params.id
    ToDo.destroy({where: {id}})
    .then(data => {
      if (data) {
        res.status(200).json({message: 'todo success to delete'})
      } else {
        res.status(404).json({message: 'error not found'})
      }
    })
    .catch(() => {
      res.status(500).json({message: 'internal server error'})
    })
  }
}


module.exports = Controller
const { ToDo } = require('../models')

class Controller {

  static create (req, res) {
    let { title, description, status, due_date } = req.body
    ToDo.create( {title, description, status, due_date} )
    .then(() => {
      res.status(201).json({message: 'Succes Create'})
    })
    .catch(err => {
      res.status(400).json({message: err.message})
    })
  }

  static findAll (req, res) {
    ToDo.findAll()
    .then(data => {
      res.status(200).json(data)
    })
    .catch(err => {
      res.status(400).json({message: err.message})
    })
  }

  static findOne (req, res) {
    let id = req.params.id
    ToDo.findByPk(id)
    .then(data => {
      res.status(200).json(data)
    })
    .catch(err => {
      res.status(400).json({message: err.message})
    })
  }

  static updateStatus (req, res) {
    let id = req.params.id
    let { status } = req.body
    ToDo.update({status}, {where: {id: id}, returning: true})
    .then((data) => {
      res.status(200).json(data)
    })
    .catch(err => {
      res.status(400).json({message: err.message})
    })
  }

  static deleteToDo (req, res) {
    let id = req.params.id
    ToDo.destroy({where: {id: id}})
    .then(() => {
      res.status(200).json({message: 'ToDo Deleted'})
    })
    .catch(err => {
      res.status(400).json({message: err.message})
    })
  }
}

module.exports = Controller;
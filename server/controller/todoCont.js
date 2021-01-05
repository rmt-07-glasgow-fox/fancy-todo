const { ToDo } = require('../models')

class Controller {

  static createToDo (req, res, next) {
    let { title, description, due_date } = req.body
    let userId = req.user.id
    ToDo.create( {title, description, due_date, UserId: userId} )
    .then(() => {
      res.status(201).json({message: 'Succes Create'})
    })
    .catch(err => {
      next(err)
    })
  }

  static findAll (req, res, next) {
    ToDo.findAll()
    .then(toDos => {
      res.status(200).json(toDos)
    })
    .catch(err => {
      next(err)
    })
  }

  static findOne (req, res, next) {
    let id = req.params.id
    ToDo.findByPk(id)
    .then(toDo => {
      if (!toDo) //throw new Error ({name: '404'});
      res.status(200).json(toDo)
    })
    .catch(err => {
      next(err)
    })
  }

  static updateToDo (req, res, next) {
    let id = req.params.id
    let { title, description, status, due_date } = req.body

    ToDo.update({title, description, status, due_date}, {where: {id: id}, returning: true})
    .then(toDo => {
      if (toDo[0] == 0) {
        //throw new Error ({name: '404'})
      }
      res.status(200).json(toDo)
    })
    .catch(err => {
      next(err)
    })
  }

  static updateStatus (req, res, next) {
    let id = req.params.id
    let { status } = req.body
    ToDo.update({status}, {where: {id: id}, returning: true})
    .then(toDo => {
      let returningStatus = toDo[0]
      let returningData  = toDo[1]
      if (returningStatus == 0) {
        //throw new Error ({name: '404'})
      }
      res.status(200).json(returningData)
    })
    .catch(err => {
      next(err)
    })
  }

  static deleteToDo (req, res, next) {
    let id = req.params.id
    ToDo.findByPk(id)
    .then(toDo => {
      if (!toDo) {
        //throw new Error ({name: '404'})
      }
      return ToDo.destroy({where: {id: id}})
    })
    .then(() => {
      res.status(200).json({message: 'ToDo succes to delete'})
    })
    .catch(err => {
      next(err)
    })
  }
}

module.exports = Controller;
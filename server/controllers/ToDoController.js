const { ToDo } = require('../models')

class ToDoController {
  static createToDo(req, res, next) {
    let UserId = req.user.id
    const {title, description, status, due_date} = req.body
    const objToDo = {title, description, status, due_date, UserId}
    
    ToDo.create(objToDo)
    .then(todo => {
      res.status(201).json(todo)
    })
    .catch(err => {
      console.log('masuk sini')
      console.log(err)
      next(err)
    })
  }

  static showToDos(req, res, next) {
    ToDo.findAll({order: [['id', 'ASC']], attributes: {exclude: ['createdAt', 'updatedAt']}})
    .then(todo => {
      return res.status(200).json(todo)
    })
    .catch(err => {
      next(err)
    })
  }

  static showToDoById(req, res, next) {
    const id = +req.params.id

    ToDo.findByPk(id, {attributes: {exclude: ['createdAt', 'updatedAt']}})
    .then(todo => {
      return res.status(200).json(todo)
    })
    .catch(err => {
      next(err)
    })
  }

  static editToDo(req, res, next) {
    const id = +req.params.id
    const {title, description, status, due_date} = req.body
    const objToDo = {title, description, status, due_date}

    ToDo.update(objToDo, {where: {id}, returning: true, plain: true})
    .then(todo => {
      if (todo) {
        return res.status(200).json(todo[1])
      }
      next({name: 'resourceNotFound'})
    })
    .catch(err => {
      next(err)
    })
  }

  static patchStatus(req, res, next) {
    const id = +req.params.id
    const status = {status: req.body.status}

    ToDo.update(status, {where: {id}, returning: true, plain: true})
    .then(todo => {
      if (todo) {
       return res.status(200).json(todo[1])
      }
      next({name: 'resourceNotFound'})
    })
    .catch(err => {
      next(err)
    })
  }

  static deleteToDo(req, res, next) {
    let id = +req.params.id
    ToDo.destroy({where: {id}})
    .then(todo => {
      if (todo) {
        return res.status(200).json({message: 'todo success to delete'})
      }
      next({name: 'resourceNotFound'})
    })
    .catch(err => {
      next(err)
    })
  }
}


module.exports = ToDoController
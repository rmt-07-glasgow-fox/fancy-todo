const { ToDo } = require('../models')

class ToDoController {
  static getAllTasks(req, res){
    ToDo.findAll({
      order: [
        ['id', 'ASC']
      ]
    })
      .then(data => {
        res.status(200).json(data)
      })
      .catch(err => {
        res.status(500).json(err)
      })
  }
  static handleAddTask(req, res){
    ToDo.create(req.body)
      .then(data => {
        res.status(201).json(data)
      })
      .catch(err => {
        if(err.errors){
          let errors = []
          err.errors.forEach(error => {
            errors.push(error.message)
          })
          res.status(400).json({
            errors
          })
        }
        res.status(500).json(err)
      })
  }
  static getTaskById(req, res){
    ToDo.findByPk(req.params.id)
      .then(data => {
        if(data){
          res.status(200).json(data)
        }else{
          res.status(404).json({
            message: 'data not found'
          })
        }
      })
      .catch(err => {
        res.status(500).json(err)
      })
  }
  static handleEditData(req, res){
    ToDo.update(req.body, {
      where:{
        id: req.params.id
      }
    })
      .then(data => {
        if(data[0] === 1){
          res.status(200).json(req.body)
        }else{
          res.status(404).json({
            message: 'data not found'
          })
        }
      })
      .catch(err => {
        if(err.errors){
          let errors = []
          err.errors.forEach(error => {
            errors.push(error.message)
          })
          res.status(400).json({
            errors
          })
        }
        res.status(500).json(err)
      })
  }
  static handlePatch(req, res){
    let findData
    ToDo.findOne({
      where: {
        id: req.params.id
      }
    })
      .then(data => {
        if(data){
          findData = data
          return ToDo.update({
            status: req.body.status
          }, {
            where:{
              id: req.params.id
            }
          })
        }else{
          res.status(404).json({
            message: 'data not found'
          })
        }
      })
      .then(status => {
        if(status[0] === 1){
          findData.status = req.body.status
          res.status(200).json({
            data: findData
          })
        }
      })
      .catch(err => {
        if(err.errors){
          let errors = []
          err.errors.forEach(error => {
            errors.push(error.message)
          })
          res.status(400).json({
            errors
          })
        }
        res.status(500).json(err)
      })
  }
  static handleDelete(req, res){
    ToDo.destroy({
      where:{
        id: req.params.id
      }
    })
      .then(data => {
        if(data === 1){
          res.status(200).json({
            message: 'todo success to delete'
          })
        }else{
          res.status(404).json({
            message: 'data not found'
          })
        }
      })
      .catch(err => {
        res.status(500).json(err)
      })
  }
}

module.exports = ToDoController
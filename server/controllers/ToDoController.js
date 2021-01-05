const { ToDo } = require('../models')

class ToDoController {
  static getAllTasks(req, res){
    // console.log(req.userData.id)
    ToDo.findAll({
      where:{
        UserId: req.userData.id
      },
      order: [
        ['id', 'ASC']
      ]
    })
      .then(data => {
        if(data.length === 0){
          res.status(200).json({
            message: "No data please create one"
          })
        }
        res.status(200).json(data)
      })
      .catch(err => {
        res.status(500).json(err)
      })
  }
  static handleAddTask(req, res){
    ToDo.create({
      title: req.body.title || '',
      description: req.body.description || '',
      status: req.body.status || '',
      due_date: req.body.due_date || '',
      UserId: req.userData.id
    })
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
    ToDo.update(
      {
        status: req.body.status
      }, 
      {
        where:{
          id: req.params.id
        },
        returning: true
      },
    )
      .then(data => {
        if(data[0] === 1){
          res.status(200).json({
            data: data[1][0]
          })
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
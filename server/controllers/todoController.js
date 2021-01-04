const Todo = require('../models/index').Todo

class todoController{
  static postTodo(req, res){
    const newTodo = {
      title: req.body.title,
      description: req.body.description,
      status: req.body.status,
      due_date: req.body.due_date
    }
    // console.log(new Date(),'<<<< new date')
    // console.log(newTodo.due_date, '<<<< dari post')
    // console.log(newTodo)
    Todo.create(newTodo)
    .then(data => {
      // console.log(data, 'ini dataaaaa<<<<<<<')
      res.status(201).json(data)
    })
    .catch(err => {
      // console.log(err.message, '<<<<ini err.message')
      if (err.message == 'Validation error: Tanggal sudah lewat'){
        return res.status(400).json({message: 'validation error'})
      }
      res.status(500).json({message: 'internal server error'})
    })
  }
  static getTodo(req,res){
    Todo.findAll({
      order: [['id', 'ASC']]
    })
    .then(data => {
      res.status(200).json(data)
    })
    .catch(err => {
      res.status(500).json({message: 'internal server error'})
    })
  }
  static getTodoById(req,res){
    Todo.findAll({
      where: {id: req.params.id},
    })
    .then(data => {
      if(data.length == 0){
        return res.status(404).json({message: 'error data not found'})
      }
      console.log(data, 'ini data getTodoById')
      res.status(200).json(data)
    })
    .catch(err => {
      res.status(500).json({message: 'internal server error'})
    })
  }
  static putTodo(req,res){
    const updatedTodo = {
      title: req.body.title,
      description: req.body.description,
      status: req.body.status,
      due_date: req.body.due_date,
      message: 'DATA UPDATED'
    }
    Todo.update(updatedTodo, {
      where: {id: req.params.id}
    })
    .then(data => {
      if(data == 0){
        return res.status(404).json({message: 'error data not found'})
      }
      console.log(data)
      res.status(200).json(updatedTodo)
    })
    .catch(err => {
      res.status(500).json({message: 'internal server error'})
    })
  }
  static deleteTodo(req,res){
    Todo.destroy({
      where: {id: req.params.id}
    })
    .then(data => {
      if (data == 0){
        res.status(404).json({message: 'error data not found'})
      }
      res.status(200).json({message: `data with id ${req.params.id} has been deleted`})
    })
    .catch(err => {
      res.status(500).json({message: 'internal server error'})
    })
  }
  static patchTodo(req,res){
    const newData = {
      status: req.body.status
    }
    Todo.update(newData, {where: {
      id: req.params.id
    }})
    .then(data => {
      res.status(200).json({message: 'data has been updated'})
    })
    .catch(err => {
      res.status(500).json({message: 'internal server error'})
    })
  }
}

module.exports = todoController
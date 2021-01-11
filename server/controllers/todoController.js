const Todo = require('../models/index').Todo

class todoController{
  static postTodo(req, res, next){
    const newTodo = {
      title: req.body.title,
      description: req.body.description,
      status: req.body.status,
      due_date: req.body.due_date,
      user_id: req.user.id //jangan lupa isi ini setelah selesai bikin authentikasi, ini dipake buat authorization
    }
    // console.log(new Date(),'<<<< new date')
    // console.log(newTodo.due_date, '<<<< dari post')
    // console.log(newTodo)
    Todo.create(newTodo)
    .then(todos => {
      // console.log(todo, 'ini todoaaaa<<<<<<<')
      res.status(201).json(todos)
    })
    .catch(err => {
      next(err)
      // console.log(err.message, '<<<<ini err.message')
      // console.log(err.name)
      // if (err.name == 'SequelizeValidationError'){
      //   return res.status(400).json({message: 'validation error'})
      // }
      // res.status(500).json({message: 'internal server error'})
    })
  }
  static getTodo(req,res, next){
    console.log(req.user, 'ini req user dalem controller')
    Todo.findAll({
      // where: {user_id: req.user.id},
      order: [['id', 'ASC']]
    })
    .then(todo => {
      res.status(200).json(todo)
    })
    .catch(err => {
      // console.log(err)
      // res.status(500).json({message: 'internal server error'})
      next(err)
    })
  }
  static getTodoById(req,res, next){
    Todo.findAll({
      where: {id: req.params.id},
    })
    .then(todos => {
      // if(todos.length == 0){
      //   return res.status(404).json({message: 'error todos not found'})
      // }
      // console.log(todos, 'ini todos getTodosById')
      res.status(200).json(todos)
    })
    .catch(err => {
      // res.status(500).json({message: 'internal server error'})
      next(err)
    })
  }
  static putTodo(req,res,next){
    const updatedTodo = {
      title: req.body.title,
      description: req.body.description,
      // status: req.body.status,
      due_date: req.body.due_date,
      // user_id: req.user.id
    }
    Todo.update(updatedTodo, {
      where: {id: req.params.id}
    })
    .then(todos => {
      if(todos == 0){
        return res.status(404).json({message: 'error todos not found'})
      }
      updatedTodo.message = 'todo updated'
      res.status(200).json(updatedTodo)
    })
    .catch(err => {
      // console.log('masuk catch')
      // if (err.name == 'SequelizeValidationError'){
      //   return res.status(400).json({message: 'validation error'})
      // }
      // res.status(500).json({message: 'internal server error'})
      next(err)
    })
  }
  static deleteTodo(req,res, next){
    Todo.destroy({
      where: {id: req.params.id}
    })
    .then(todos => {
      // if (todos == 0){
      //   return res.status(404).json({message: 'error todo not found'})
      // }
      return res.status(200).json({message: `todo with id ${req.params.id} has been deleted`})
    })
    .catch(err => {
      // res.status(500).json({message: 'internal server error'})
      next(err)
    })
  }
  static patchTodo(req,res, next){
    const newData = {
      status: req.body.status
    }
    Todo.update(newData, {where: {
      id: req.params.id
    }, returning: true})
    .then(todos => {
      res.status(200).json({todo: todos[1][0]})
    })
    .catch(err => {
      // res.status(500).json({message: 'internal server error'})
      next(err)
    })
  }   
}

module.exports = todoController
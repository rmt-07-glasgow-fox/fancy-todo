const { Todo } = require('../models')

class TodoController {
  static createToDo(req, res){
    const newTodo = {
      title: req.body.title,
      description: req.body.description,
      status: req.body.status,
      due_date: req.body.due_date
    }
    Todo.create(newTodo)
    .then((result) => {
      res.status(201).json(result)
    }).catch((err) => {
      if(err.errors){
        const errMessages = []
        err.errors.forEach(element => {
            errMessages.push(element.message)
        });
        res.status(400).json(errMessages)
      } else {
        res.status(500).json({
          msg: 'internal server error'
        })
      }
    });
  }
  static getAllToDos(req, res){
    Todo.findAll()
    .then((result) => {
      res.status(200).json(result)
    }).catch((err) => {
      res.status(500).json({
        msg: 'internal server error'
      })
    });
  }
  static getToDo(req, res){
    const id = +req.params.id
    Todo.findByPk(id)
    .then((result) => {
      if(result){
        res.status(200).json(result)
      } else {
        res.status(404).json({
          msg: 'error not found'
        })
      }
    }).catch((err) => {
      res.status(500).json({
        msg: 'internal server error'
      })
    });
  }
  static updateToDo(req, res){
    const id = +req.params.id
    const editTodo = {
      title: req.body.title,
      description: req.body.description,
      status: req.body.status,
      due_date: req.body.due_date
    }
    Todo.update(editTodo, {
      where: {
        id: id
      },
      returning: true
    })
    .then((result) => {
      // console.log(result)
      if(result[0] === 0){
        res.status(404).json({
          msg: 'error not found'
        })
      } else {
        res.status(200).json(result[1][0])
      }
    }).catch((err) => {
      if(err.errors){
        const errMessages = []
        err.errors.forEach(element => {
            errMessages.push(element.message)
        });
        res.status(400).json(errMessages)
      } else {
        res.status(500).json({
          msg: 'internal server error'
        })
      }
    });
  }
  static modifyToDo(req, res){
    const id = +req.params.id
    const editStatusTodo = {status: req.body.status}
    Todo.update(editStatusTodo, {
      where: {id: id},
      returning: true
    })
    .then((result) => {
      // console.log(result)
      if(result[0] === 0){
        res.status(404).json({
          msg: 'error not found'
        })
      } else {
        res.status(200).json(result[1][0])
      }
    }).catch((err) => {
      if(err.errors){
        const errMessages = []
        err.errors.forEach(element => {
            errMessages.push(element.message)
        });
        res.status(400).json(errMessages)
      } else {
        res.status(500).json({
          msg: 'internal server error'
        })
      }
    });
  }
  static deleteToDo(req, res){
    const id = +req.params.id
    Todo.destroy({
      where: {id: id}
    })
    .then((result) => {
      if(result === 1){
        res.status(200).json({
          msg: 'todo success to delete'
        })
      } else {
        res.status(404).json({
          msg: 'error not found'
        })
      }
    }).catch((err) => {
      res.status(500).json({
        msg: 'internal server error'
      })
    });
  }
}

module.exports = TodoController
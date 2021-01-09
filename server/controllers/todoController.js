const { Todo } = require('../models')

class TodoController {
  static createToDo(req, res, next) {
    const newTodo = {
      title: req.body.title,
      description: req.body.description,
      status: req.body.status || false,
      due_date: req.body.due_date,
      user_id: req.user.id
    }
    Todo.create(newTodo)
    .then((result) => {
      res.status(201).json(result)
    }).catch((err) => {
      next(err)
    })
  }
  static getAllToDos(req, res, next) {
    Todo.findAll({
      where: {
        user_id: req.user.id
      }
    })
    .then((result) => {
      res.status(200).json(result)
    }).catch((err) => {
      next(err)
    })
  }
  static getToDo(req, res, next) {
    const id = +req.params.id
    Todo.findByPk(id)
    .then((result) => {
      if(result) {
        res.status(200).json(result)
      } else {
        next({ name: 'notFound'})
      }
    }).catch((err) => {
      next(err)
    })
  }
  static updateToDo(req, res, next) {
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
      if(result[0] === 0) {
        next({ name: 'notFound'})
      } else {
        res.status(200).json(result[1][0])
      }
    }).catch((err) => {
      next(err)
    });
  }
  static modifyToDo(req, res, next) {
    const id = +req.params.id
    const editStatusTodo = {status: req.body.status}
    Todo.update(editStatusTodo, {
      where: {id: id},
      returning: true
    })
    .then((result) => {
      // console.log(result)
      if(result[0] === 0){
        next({ name: 'notFound'})
      } else {
        res.status(200).json(result[1][0])
      }
    }).catch((err) => {
      next(err)
    });
  }
  static deleteToDo(req, res, next) {
    const id = +req.params.id
    Todo.destroy({
      where: { id: id }
    })
    .then((result) => {
      if(result === 1) {
        res.status(200).json({
          msg: 'todo success to delete'
        })
      } else {
        next({ name: 'notFound'})
      }
    }).catch((err) => {
      next(err)
    });
  }
}

module.exports = TodoController
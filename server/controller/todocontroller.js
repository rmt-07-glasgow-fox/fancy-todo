const { User, Todo } = require('../models')

class TodoController {
      static showTodo(req, res, next) {
            
            Todo.findAll()
                  .then(data => {
                        res.status(200).json(data)
                  })
                  .catch(err => {
                        next(err)
                  })
      }

      static addTodo(req, res, next) {
            const newTodo = {
                  title: req.body.title,
                  description: req.body.description,
                  status: req.body.status,
                  due_date: req.body.due_date,
                  UserId: req.user.id
            }

            Todo.create(newTodo)
                  .then(data => {
                        res.status(201).json({
                              title: data.title,
                              description: data.description,
                              status: data.status,
                              due_date: data.due_date,
                              UserId: req.user.id
                        })
                  })
                  .catch(err => {
                        if (err.name == "SequelizeValidationError") next({name: "SequelizeValidationError"})
                        next(err)
                  })
      }

      static showTodoById (req, res) {
            let id = req.params.id

            Todo.findByPk(id)
                  .then(data => {
                  
                        res.status(200).json(data)
                  })
                  .catch(err => {
                        next({name: "SourceNotFound"})
                  })

      }

      static edit(req, res) {
            const editedTodo = {
                  title: req.body.title,
                  description: req.body.description,
                  status: req.body.status,
                  due_date: req.body.due_date
            }

            const id = req.params.id

            Todo.update(editedTodo, {where: {id}})
                  .then(data => {
                        res.status(200).json(data, {message: "todo has updated"})
                  })
                  .catch(err => {
                        if (err.name == "SequelizeValidationError") next({name: "SequelizeValidationError"})
                        if (err.name == "SourceNotFound") next({name: "SourceNotFound"})
                        next(err)
                  }) 
      }

      static editStatus(req, res) {
            const status = {
                  status: req.body.status
            }

            const id =req.params.id

            Todo.update(status, {where: {id}})
                  .then(data => {
                        res.status(200).json(data)
                  })
                  .catch(err => {
                        if (err.name == "SequelizeValidationError") next({name: "SequelizeValidationError"})
                        if (err.name == "SourceNotFound") next({name: "SourceNotFound"})
                        next(err)
            
                  })

      }

      static delete(req, res) {
            const id = req.params.id
            Todo.destroy({where: {id}}) 
                  .then(() => {
                        res.status(200).json({message: "success deleted"})
                  })
                  .catch(err => {
                        if (err.name == "SequelizeValidationError") next({name: "SequelizeValidationError"})
                        if (err.name == "SourceNotFound") next({name: "SourceNotFound"})
                        next(err)
                  })
      }

}

module.exports = TodoController

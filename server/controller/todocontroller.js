const { User, Todo } = require('../models')

class TodoController {
      static showTodo(req, res, next) {
            
            Todo.findAll({order: ["due_date"]})
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

      static edit(req, res, next) {
            const editedTodo = {
                  title: req.body.title,
                  description: req.body.description,
                  status: req.body.status,
                  due_date: req.body.due_date
            }

            const id = req.params.id

            Todo.update(editedTodo, {where: {id}})
                  .then(data => {
                        res.status(200).json(data)
                        return Todo.findByPk(id)
                  })
                  .then(todo => {
                        res.status(200).json(todo)
                  })
                  .catch(err => {
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
                       return Todo.findByPk(id)
                  })
                  .then(todo => {
                        res.status(200).json(todo)
                  })
                  .catch(err => {
                        // if (err.name == "SequelizeValidationError") next({name: "SequelizeValidationError"})
                        // if (err.name == "SourceNotFound") next({name: "SourceNotFound"})
                        next(err)
            
                  })

      }

      static delete(req, res) {
            const id = req.params.id
            Todo.destroy({where: {id}}) 
                  .then(data => {
                        res.status(200).json("success delete")
                  })
                  .catch(err => {
                        if (err.name == "SequelizeValidationError") next({name: "SequelizeValidationError"})
                        next(err)
                  })
      }

}

module.exports = TodoController

const { User, Todo } = require('../models')

class TodoController {
      static showTodo(req, res) {
            Todo.findAll()
                  .then(data => {
                        res.status(200).json(data)
                  })
                  .catch(err => {
                        res.status(500).json(err)
                  })
      }

      static addTodo(req, res) {
            const newTodo = {
                  title: req.body.title,
                  description: req.body.description,
                  status: req.body.status,
                  due_date: req.body.due_date
            }

            Todo.create(newTodo)
                  .then(data => {
                        res.status(201).json({
                              title: data.title,
                              description: data.description,
                              status: data.status,
                              due_date: data.due_date
                        })
                  })
                  .catch(err => {
                        res.status(400).json(err)
                  })
      }

      static showTodoById (req, res) {
            let id = req.params.id

            Todo.findByPk(id)
                  .then(data => {
                        res.status(200).json(data)
                  })
                  .catch(err => {
                        res.status(404).json(err)
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
                        res.status(200).json(data)
                  })
                  .catch(err => {
                        res.status(400).json(err)
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
                        res.status(400).json(err)
                  })

      }

      static delete(req, res) {
            const id = req.params.id
            Todo.destroy({where: {id}}) 
                  .then(() => {
                        res.status(200).json({message: "success deleted"})
                  })
                  .catch(err => {
                        res.status(404).json(err)
                  })
      }

}

module.exports = TodoController

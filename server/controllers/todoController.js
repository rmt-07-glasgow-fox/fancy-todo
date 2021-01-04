const { Todo } = require('../models')

class TodoController {
  static getTodos(req, res) {
    Todo.findAll()
      .then(data => {
       return res.status(200).json(data)
      })
      .catch(err => {
       return res.status(500).json({message: 'internal server error'})
      })
  }

  static createTodo(req, res) {
    const { title, description, status, due_date} = req.body
    Todo.create({
      title,
      description,
      status,
      due_date
    })
      .then(data => {
        const response = {
          id: data.id,
          title: data.title,
          description: data.description,
          status: data.status,
          due_date: data.due_date
        }
        return res.status(201).json(response)
      })
      .catch(err => {
        return res.status(500).json(err)
      })
  }
}

module.exports = TodoController
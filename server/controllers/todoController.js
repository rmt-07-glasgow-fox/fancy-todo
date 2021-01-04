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
        return res.status(500).json({message: 'internal server error'})
      })
  }

  static getTodoById(req, res) {
    const id = +req.params.id
    console.log(id);
    Todo.findByPk(id)
      .then(data => {
        if (!data) {
          return res.status(404).json({message: 'error not found'})
        }
        return res.status(200).json(data)
      })
      .catch(err => {
       return res.status(500).json({message: 'internal server error'})
      })
  }

  static putTodo(req, res) {
    const id = +req.params.id
    const { title, description, status, due_date} = req.body
    Todo.update({
      title, description, status, due_date
    },
    {where: { id }})
      .then(data => {
        if (data[0] === 0) {
          return res.status(404).json({message: 'error not found'})
        }
        const response = {
          id,
          title,
          description,
          status,
          due_date
        }
        return res.status(200).json(response)
      })
      .catch(err => {
        return res.status(500).json({message: 'internal server error'})
      })
  }

  static patchTodo(req, res) {
    const id = +req.params.id
    const { status } = req.body
    Todo.update({
      status
    },
    {where: { id }})
      .then(data => {
        return Todo.findByPk(id)
      })
      .then(output => {
        console.log(output);
      if (output === null) {
        return res.status(404).json({message: 'error not found'})
      }
      return res.status(200).json(output)
    })
    .catch(err => {
      return res.status(500).json(err)
    })
  }

  static deleteTodo(req, res) {
    let id = +req.params.id
    Todo.findByPk(id)
      .then(data => {
        if (!data) {
          return res.status(404).json({message: 'error not found'})
        }
        return Todo.destroy({where: { id }})
      })
      .then(output => {
        return res.status(200).json({message: 'todo success to delete'})
      })
      .catch(err => {
       return res.status(500).json({message: 'internal server error'})
      })
  }
}

module.exports = TodoController
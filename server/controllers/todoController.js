const { Todo } = require('../models')

class TodoController {
  static async getTodos(req, res) {
    try {
      const todos = await Todo.findAll()
      return res.status(200).json(todos)
    } catch (err) {
      return res.status(500).json({message: 'internal server error'})
    }
  }

  static async createTodo(req, res) {
    const { title, description, status, due_date} = req.body
    try {
      const newTodo = await Todo.create({
        title,
        description,
        status,
        due_date,
        UserId: req.user.id
      })
      const response = {
        id: newTodo.id,
        title: newTodo.title,
        description: newTodo.description,
        status: newTodo.status,
        due_date: newTodo.due_date,
        UserId: newTodo.UserId
      }
      return res.status(201).json(response)
    } catch (err) {
      if (err.name === 'SequelizeValidationError') {
        const errors = err.errors.map(el => {
          return el.message
        })
        return res.status(404).json(errors)
      }
      res.send(err)
      // return res.status(500).json({message: 'internal server error'})
    }
  }

  static async getTodoById(req, res) {
    const id = +req.params.id
    try {
      const todo = await Todo.findByPk(id)
      if (!todo) {
        return res.status(404).json({message: 'error not found'})
      }
      return res.status(200).json(todo)
    } catch (err) {
      return res.status(500).json({message: 'internal server error'})
    }
  }

  static async putTodo(req, res) {
    const id = +req.params.id
    const { title, description, status, due_date} = req.body
    try {
      const afterPutTodo = await Todo.update({
        title, description, status, due_date
      },
      {where: { id }})
      if (afterPutTodo[0] === 0) {
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
    } catch (err) {
      return res.status(500).json({message: 'internal server error'})
    }
  }

  static async patchTodo(req, res) {
    const id = +req.params.id
    const { status } = req.body
    try {
      const afterPAtchTodo = await Todo.update({
        status
      },
      {where: { id }, returning: true})
      if (!afterPAtchTodo[1].length) {
        return res.status(404).json({message: 'error not found'})
      }
      return res.status(200).json(afterPAtchTodo[1][0])
    } catch (err) {
      return res.status(500).json(err)
    }
  }

  static async deleteTodo(req, res) {
    let id = +req.params.id
    try {
      const deletedTodo = await Todo.findByPk(id)
      if (!deletedTodo) {
        return res.status(404).json({message: 'error not found'})
      }
      await Todo.destroy({where: { id }})
      return res.status(200).json({message: 'todo success to delete'})
    } catch (err) {
      return res.status(500).json({message: 'internal server error'})
    }
  }
}

module.exports = TodoController
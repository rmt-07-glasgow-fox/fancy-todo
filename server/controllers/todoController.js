const { Todo } = require('../models')
const axios = require('axios')

class TodoController {
  static async getTodos(req, res, next) {
    try {
      const todos = await Todo.findAll()
      return res.status(200).json(todos)
    } catch (err) {
      next(err)
    }
  }

  static async createTodo(req, res, next) {
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
      next(err)
    }
  }

  static async getTodoById(req, res, next) {
    const id = +req.params.id
    try {
      const todo = await Todo.findByPk(id)
      console.log(todo);
      if (!todo) {
        throw {name: 'notFound'}
      }
      return res.status(200).json(todo)
    } catch (err) {
      next(err)
    }
  }

  static async putTodo(req, res, next) {
    const id = +req.params.id
    const { title, description, status, due_date} = req.body
    try {
      const afterPutTodo = await Todo.update({
        title, description, status, due_date
      },
      {where: { id }})
      if (afterPutTodo[0] === 0) {
        throw {name: 'notFound'}
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
      next(err)
    }
  }

  static async patchTodo(req, res, next) {
    const id = +req.params.id
    const { status } = req.body
    try {
      const afterPAtchTodo = await Todo.update({
        status
      },
      {where: { id }, returning: true})
      if (!afterPAtchTodo[1].length) {
        throw {name: 'notFound'}
      }
      return res.status(200).json(afterPAtchTodo[1][0])
    } catch (err) {
      next(err)
    }
  }

  static async deleteTodo(req, res, next) {
    let id = +req.params.id
    try {
      const deletedTodo = await Todo.findByPk(id)
      if (!deletedTodo) {
        throw {name: 'notFound'}
      }
      await Todo.destroy({where: { id }})
      return res.status(200).json({message: 'todo success to delete'})
    } catch (err) {
      next(err)
    }
  }

  static async apiTime(req, res, next) {
    try {
      const apiTime = await axios.get('http://worldtimeapi.org/api/timezone/Asia/Jakarta')
      const ipUser = apiTime.data.client_ip
      const apiLocation = await axios.get(`http://ip-api.com/json/${ipUser}`)
      const apiData = {
        ip: apiTime.data.client_ip,
        country: apiLocation.data.country,
        region: apiLocation.data.regionName,
        city: apiLocation.data.city,
        timezone: apiTime.data.timezone,
        dateTime: apiTime.data.datetime,
        zone: apiTime.data.abbreviation
      }
      return res.status(200).json(apiData)
    } catch (err) {
      next(err)
    }
  }
}

module.exports = TodoController
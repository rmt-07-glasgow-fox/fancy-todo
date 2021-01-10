const {Todo} = require("../models")
const axios = require('axios')

class Controller {

  static async createTodo(req, res, next) {
    try {
      const data = {
        title: req.body.title,
        description: req.body.description,
        status: req.body.status,
        due_date: req.body.due_date,
        UserId: req.user.id
      }
      const create = await Todo.create(data)
      res.status(201).json(create)
    } catch (err) {
      console.log(err);
      next (err)
    }
  }
  
  static async getTodos(req, res, next) {
    try {
      let user = req.user
      const todos = await Todo.findAll({where: {UserId: user.id}})
      if (todos) {
        res.status(200).json(todos)
      } else {
        throw {
          status: 404,
          message: "Data not found"
        }
      }
    } catch (err) {
      next (err)
    }
  }

  static async getTodo(req, res, next) {
    try {
      let user = req.user
      const todo = await Todo.findOne({where: {UserId: user.id}})
      if (todo) {
        res.status(200).json(todo)
      } else {
        throw {
          status: 404,
          message: "Data not found"
        }
      }
    } catch (err) {
      next (err)
    }
  }
    
  static async getTodoById(req, res, next) {
    try {
      let id = req.params.id
      const todo = await Todo.findByPk(id)
      res.status(200).json(todo)
    } catch (err) {
      next (err)
    }
  }

  static async updateTodo(req, res, next) {
    try {
      let id = req.params.id
      const data = {
        title: req.body.title,
        description: req.body.description,
        status: req.body.status,
        due_date: req.body.due_date,
        UserId: req.user.id
      }
      const edit = await Todo.update(data, {where: {id}, returning: true})
      res.status(200).json(edit[1][0])
    } catch (err) {
      next (err)
    }
  }
    
  static async updateTodoStatus(req, res, next) {
    try {
      let data
      let id = req.params.id
      let todo = await Todo.findByPk(id)
      if (todo) {
        switch (todo.status) {
          case 'TODO':
            data = {status: 'DOING'}
            break;
          case 'DOING':
            data = {status: 'DONE'}
            break;
          case 'DONE':
            data = {status: 'EXPIRED'}
            break;
          default:
            data = {status: 'EXPIRED'}
            break;
        }
        const edit = await Todo.update(data, {where: {id}, returning: true})
        res.status(200).json(edit[1][0])
      } else {
        throw {
          status: 404,
          message: "Data not found"
        }
      }
    } catch (err) {
      console.log(err);
      next (err)
    }
  }

  static async deleteTodo(req, res, next) {
    try {
      const id = req.params.id
      const todo = await Todo.findByPk(id)
      console.log(todo);
      const title = todo.title
      if (todo) {
        const deleted = await Todo.destroy({where: {id}})
        res.status(200).json({message: `todo with title: '${title}' success to delete`})
      } else {
        throw {
            status: 404,
            message: "Data not found"
        }
      }
    } catch (err) {
      next (err)
    }
  }

}

module.exports = Controller
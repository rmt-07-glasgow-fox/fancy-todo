const { Todo, User } = require('../models');

class TodoController {

  static async createTodo(req, res, next) {    
    try {      
      const {title, description, status, due_date} = req.body;
      const UserId = +req.userId;
      const newTodo = {title, description, status, due_date, UserId};
      const createdTodo = await Todo.create(newTodo);
      return res.status(201).json(createdTodo);
    } 
    catch (err) {
      next(err);    
    }
  }

  static async getAllTodo(req, res, next) {
    try {
      let todos = await Todo.findAll({
        where: { UserId: req.userId },
        order: [ 'id' ]
      });
      return res.status(200).json(todos);
    } 
    catch (err) {
      next(err);
    }
  }

  static async getTodoById(req, res, next) {
    try {
      const id = +req.params.id;
      const todo = await Todo.findByPk(id);
      if(todo) return res.status(200).json(todo);
    } 
    catch (err) {
      next(err);
    }
  }

  static async updateTodo(req, res, next) {
    try {
      const id = +req.params.id;
      const {title, description, status, due_date} = req.body;
      const todo = await Todo.findByPk(id);
      todo.title = title;
      todo.description = description;
      todo.status = status;
      todo.due_date = due_date;
      const updatedTodo = await todo.save();
      return res.status(200).json(updatedTodo);    
    } 
    catch (err) {
      next (err);
    }
  }

  static async updateStatTodo(req, res) {
    try {
      const id = +req.params.id;
      const {status} = req.body;
      const todo = await Todo.findByPk(id);
      if (todo) {
        todo.status = status;
        await todo.save();  
        return res.status(200).json(todo);
      }
    }
    catch (err) {
      next(err);
    }
  }

  static async deleteTodo(req, res) {
    const id = +req.params.id;
    try {
      const todo = await Todo.findByPk(id);
      if(todo) {
        const status = await Todo.destroy({where: {id}});
        return res.status(200).json(todo);
      }      
    }
    catch(err) {
      next(err);
    } 
  }
}

module.exports = TodoController;
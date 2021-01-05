const { Todo, User } = require('../models');

class TodoController {

  static async createTodo(req, res) {
    try {
      const {title, description, status, due_date} = req.body;
      const UserId = +req.userId;
      const newTodo = {title, description, status, due_date, UserId};
      const createdTodo = await Todo.create(newTodo);
      return res.status(201).json(createdTodo);
    } 
    catch (err) {
      if(err.message === 'Validation error: Validation isAfter on due_date failed') {
        return res.status(400).json({message: 'Due date cannot be before today.'});
      }
      return res.status(500).json({message: 'internal server error'});      
    }
  }

  static async getAllTodo(req, res) {
    try {
      let todos = await Todo.findAll();
      return res.status(200).json(todos);
    } 
    catch (err) {
      return res.status(500).json({message: 'internal server error'});
    }
  }

  static async getTodoById(req, res) {
    try {
      const id = +req.params.id;
      const todo = await Todo.findByPk(id);
      if(todo) return res.status(200).json(todo)   
      return res.status(404).json({message: 'error not found'});     
    } 
    catch (err) {
      return res.status(500).json({message: 'internal server error'});
    }
  }

  static async updateTodo(req, res) {
    try {
      const id = +req.params.id;
      const {title, description, status, due_date} = req.body;
      const todo = await Todo.findByPk(id);
      if(!todo) return res.status(404).json({message: 'error not found'}); 
      else {
        todo.title = title;
        todo.description = description;
        todo.status = status;
        todo.due_date = due_date;
        const updatedTodo = await todo.save();
        return res.status(200).json(updatedTodo);
      }      
    } 
    catch (err) {
      return res.status(500).json({message: 'internal server error'});
    }
  }

  static updateStatTodo(req, res) {
    const id = +req.params.id;
    const {status} = req.body;
    Todo.findByPk(id)
      .then(todo => {
        if(todo) {
          todo.status = status;
          return todo.save();  
        } else {
          res.status(404).json({message: 'error not found'});
        }       
      })
      .then(todo => {
        res.status(200).json(todo);
      })
      .catch(err => {
        if(err.message === 'Validation error: Validation isAfter on due_date failed') {
          return res.status(400).json({message: 'Due date cannot be before today.'});
        }
        return res.status(500).json({message: 'internal server error'});
      })    
  }

  static async deleteTodo(req, res) {
    const id = +req.params.id;
    try {
      const todo = await Todo.findByPk(id);
      if(!todo) return res.status(404).json({message: 'error not found'});
      else {
        const status = await Todo.destroy({where: {id}});
        return res.status(200).json(todo);
      }      
    }
    catch(err) {
      return res.status(500).json({message: 'internal server error'});
    } 
  }

}

module.exports = TodoController;
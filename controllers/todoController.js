const {Todo} = require('../models');

class TodoController {

  static createTodo(req, res) {
    const {title, description, status, due_date} = req.body;
    const newTodo = {title, description, status, due_date};

    Todo.create(newTodo)
      .then(createdTodo => {
        res.status(201).json(createdTodo);
      })
      .catch(err => {
        if(err.message === 'Validation error: Validation isAfter on due_date failed') {
          res.status(400).json({message: 'Due date cannot be before today.'});
        } else {
          res.status(500).json({message: 'internal server error'});
        }        
      });
  }

  static getAllTodo(req, res) {
    Todo.findAll()
      .then(todos => {
        res.status(200).json(todos);
      })
      .catch(err => {
        res.status(500).json({message: 'internal server error'});
      })
  }

  static getTodoById(req, res) {
    const id = +req.params.id;
    Todo.findByPk(id)
      .then(todo => {
        if(todo) return res.status(200).json(todo)   
        return res.status(404).json({message: 'error not found'});             
      })
      .catch(err => {
        res.status(500).json({message: 'internal server error'});
      })
  }

  static updateTodo(req, res) {
    const id = +req.params.id;
    const {title, description, status, due_date} = req.body;
    Todo.findByPk(id)
      .then(todo => {
        if(!todo) return res.status(404).json({message: 'error not found'});         
        todo.title = title;
        todo.description = description;
        todo.status = status;
        todo.due_date = due_date;
        return todo.save();
      })
      .then(todo => {
        res.status(200).json(todo);
      })
      .catch(err => {
        if(err.message === 'Validation error: Validation isAfter on due_date failed') {
          res.status(400).json({message: 'Due date cannot be before today.'});
        } else {
          res.status(500).json({message: 'internal server error'});
        }  
      })    
  }

  static updateStatTodo(req, res) {
    const id = +req.params.id;
    const {status} = req.body;
    Todo.findByPk(id)
      .then(todo => {
        if(!todo) {
          return res.status(404).json({message: 'error not found'});      
        }   
        todo.status = status;
        return todo.save();
      })
      .then(todo => {
        res.status(200).json(todo);
      })
      .catch(err => {
        console.log(err);
        if(err.message === 'Validation error: Validation isAfter on due_date failed') {
          return res.status(400).json({message: 'Due date cannot be before today.'});
        }
        return res.status(500).json({message: 'internal server error'});
      })    
  }

  static deleteTodo(req, res) {
    const id = +req.params.id;
    let deletedTodo;
    Todo.findByPk(id)
      .then(todo => {
        if(!todo) return res.status(404).json({message: 'error not found'});     
        deletedTodo = todo;
        return Todo.destroy({where: {id}})    
      })
      .then((data) => {
        res.status(200).json(deletedTodo);
      })
      .catch(err => {
        res.status(500).json({message: 'internal server error'});
      })
  }

}

module.exports = TodoController;
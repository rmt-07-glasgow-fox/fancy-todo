const {Todo} = require('../models');

class todoController {

  static createTodo(req, res) {
    const {title, description, status, due_date} = req.body;
    const newTodo = {title, description, status, due_date};

    Todo.create(newTodo)
      .then(createdTodo => {
        res.status(201).json(createdTodo)
      })
      .catch(err => {
        if(err.message === 'Validation error: Validation isAfter on due_date failed') {
          res.status(400).json({message: 'Due date cannot be before today.'})
        } else {
          res.status(500).json({message: 'internal server error'})
        }        
      });
  }

}

module.exports = todoController;
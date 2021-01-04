const { Todo } = require('../models');

class todoController {
  static getTodoHandler(req, res) {
    Todo.findAll()
      .then(dataTodo => {
        res.status(201).json(dataTodo);
      })
      .catch(err => {
        res.status(500).json({ message: 'Internal Server Error' });
      });
  }

  static postTodoHandler(req, res){
    const dataInputTodo = {
      title: req.body.title,
      description: req.body.description,
      status: false,
      due_date: req.body.due_date
    }
    Todo.create(dataInputTodo)
      .then(dataTodo => {
        return res.status(201).json(dataTodo);
      })
      .catch(err => {
        if(err.errors){
          // Handle error from validation
          return res.status(400).json({ message: err.errors[0].message });
        }
        // Handle error from server
        return res.status(500).json({ message: err.message });
      })
  }
}

module.exports = todoController;
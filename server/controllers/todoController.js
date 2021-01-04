const { Todo } = require('../models');

class todoController {
  static getAllTodoHandler(req, res) {
    Todo.findAll()
      .then(dataTodo => {
        res.status(201).json(dataTodo);
      })
      .catch(err => {
        res.status(500).json({ message: 'Internal Server Error' });
      });
  }

  static postTodoHandler(req, res) {
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
        if (err.errors) {
          // Handle error from validation
          return res.status(400).json({ message: err.errors[0].message });
        }
        // Handle error from server
        return res.status(500).json({ message: err });
      })
  }

  static getOneTodoHandler(req, res) {
    const id = req.params.id;
    Todo.findOne({ where: { id } })
      .then(dataTodo => {
        if (!dataTodo) {
          throw { message: 'Error, data not found' };
        }
        return res.status(200).json(dataTodo);
      })
      .catch(err => {
        return res.status(404).json(err);
      });
  }

  static putTodoHandler(req, res) {
    const id = req.params.id;
    const dataUpdateTodo = {
      title: req.body.title,
      description: req.body.description,
      status: req.body.status,
      due_date: req.body.due_date
    }
    Todo.update(dataUpdateTodo, {
      returning: true,
      where: { id }
    })
      .then(dataTodo => {
        if (!dataTodo || dataTodo[0] === 0) {
          // Handle error from null
          return res.status(404).json({ message: 'Error, data not found' });
        }
        // Get data Object
        return res.status(200).json(dataTodo[1][0]);
      })
      .catch(err => {
        if (err.errors) {
          // Handle error from validation
          return res.status(400).json({ message: err.errors[0].message });
        }
        // Handle error from server
        return res.status(500).json({ message: err });
      });
  }
}

module.exports = todoController;
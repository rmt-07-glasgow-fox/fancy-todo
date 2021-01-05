const { Todo } = require('../models/index.js');

class TodoController {
  static async postTodo(req, res) {
    try {
      const input = {
        title: req.body.title,
        description: req.body.description,
        status: req.body.status,
        due_date:req.body.due_date,
        UserId: req.user.id
      }
      const todo = await Todo.create(input);

      return res.status(201).json(todo);
    } catch (err) {
      if (err.name === 'SequelizeValidationError') {
        return res.status(400).json({ message: `Error 400: ${err.errors[0].message}` });
      };
      return res.status(500).json({ message: `Error 500: ${err.errors[0].message}` });
    };
  };

  static async getTodo(req, res) {
    try {
      const todo = await Todo.findAll({order:[['due_date', 'ASC']]});

      return res.status(200).json(todo);
    } catch (err) {
      return res.status(500).json(`Error 500: ${err.errors[0].message}`)
    };
  };

  static async getDetailTodo(req, res) {
    try {
      const inputID = Number(req.params.id);
      const todo = await Todo.findByPk(inputID);

      if (!todo) {
        throw { message: `Error 404: ToDo List not found` }
      }
      return res.status(200).json(todo);
    } catch (err) {
      return res.status(404).json(err);
    };
  };

  static async updateTodo(req, res) {
    try {
      const inputID = Number(req.params.id);
      const { title, description, status, due_date } = req.body;
      const todoUpdate = await Todo.update({ title, description, status, due_date }, { where: { id: inputID } });
      const todo = await Todo.findByPk(inputID, { todoUpdate })

      if (!todo) {
        return res.status(404).json({ message: 'ToDo List not found.' });
      }
      return res.status(200).json(todo);
    } catch (err) {
      if (err.name === 'SequelizeValidationError') {
        return res.status(400).json({ message: `Error 400: ${err.errors[0].message}` });
      };
      return res.status(500).json({ message: `Error 500: ${err.errors[0].message}` });
    };
  };

  static async markTodo(req, res) {
    try {
      const inputID = Number(req.params.id);
      const { status } = req.body;
      const todoUpdate = await Todo.update({ status }, { where: { id: inputID } });
      const todo = await Todo.findByPk(inputID, { todoUpdate })

      if (!todo) {
        return res.status(404).json({ message: 'ToDo List not found.' });
      }
      return res.status(200).json(todo);
    } catch (err) {
      if (err.name === 'SequelizeValidationError') {
        return res.status(400).json({ message: `Error 400: ${err.errors[0].message}` });
      };
      return res.status(500).json({ message: `Error 500: ${err.errors[0].message}` });
    };
  };

  static async deleteTodo(req, res) {
    try {
      const inputID = Number(req.params.id);
      const todo = await Todo.findByPk(inputID)
      await Todo.destroy({ where: { id: inputID } });

      if (!todo) {
        return res.status(404).json({ message: 'ToDo List not found.' });
      }
      return res.status(200).json({ message: "ToDo success to delete" });
    } catch (err) {
      return res.status(500).json(err);
    }
  };
};

module.exports = TodoController;
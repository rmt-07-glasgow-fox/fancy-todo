const { Todo } = require('../models/index.js');

class TodoController {
  static async postTodo(req, res, next) {
    try {
      const input = {
        title: req.body.title,
        description: req.body.description,
        status: req.body.status,
        due_date: req.body.due_date,
        UserId: req.user.id
      }
      const todo = await Todo.create(input);

      return res.status(201).json(todo);
    } catch (err) {
      next(err);
    };
  };

  static async getTodo(req, res, next) {
    try {
      const todo = await Todo.findAll({ order: [['due_date', 'ASC']] });

      return res.status(200).json(todo);
    } catch (err) {
      next(err);
    };
  };

  static async getDetailTodo(req, res) {
    try {
      const inputID = Number(req.params.id);
      const todo = await Todo.findByPk(inputID);

      if (!todo) {
        throw { name: `NotFound` };
      }
      return res.status(200).json(todo);
    } catch (err) {
      next(err);
    };
  };

  static async updateTodo(req, res) {
    try {
      const inputID = Number(req.params.id);
      const { title, description, status, due_date } = req.body;
      const todoUpdate = await Todo.update({ title, description, status, due_date }, { where: { id: inputID } });
      const todo = await Todo.findByPk(inputID, { todoUpdate })

      if (!todo) {
        throw { name: `NotFound` };
      }
      return res.status(200).json(todo);
    } catch (err) {
      next(err);
    };
  };

  static async markTodo(req, res) {
    try {
      const inputID = Number(req.params.id);
      const { status } = req.body;
      const todoUpdate = await Todo.update({ status }, { where: { id: inputID } });
      const todo = await Todo.findByPk(inputID, { todoUpdate })

      if (!todo) {
        throw { name: `NotFound` };
      }
      return res.status(200).json(todo);
    } catch (err) {
      next(err);
    };
  };

  static async deleteTodo(req, res) {
    try {
      const inputID = Number(req.params.id);
      const todo = await Todo.findByPk(inputID)
      await Todo.destroy({ where: { id: inputID } });

      if (!todo) {
        throw { name: `NotFound` };
      }
      return res.status(200).json({ message: "ToDo success to delete" });
    } catch (err) {
      next(err);
    }
  };
};

module.exports = TodoController;
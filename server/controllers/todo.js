const { Todo } = require('../models');

exports.list = async (req, res) => {
  try {
    const userId = req.user.id;
    const todos = await Todo.findAll({ where: { UserId: userId } });
    return res.status(200).json(todos);
  } catch (error) {
    return res.status(500).json(error);
  }
};

exports.create = async (req, res) => {
  const body = {
    title: req.body.title,
    description: req.body.description,
    status: req.body.status,
    due_date: req.body.due_date,
    UserId: req.user.id,
  };

  try {
    const todo = await Todo.create(body);
    return res.status(201).json(todo);
  } catch (error) {
    return res.status(400).json(error);
  }
};

exports.detail = async (req, res) => {
  const id = req.params.id;
  const userId = req.user.id;

  try {
    const todo = await Todo.findOne({ where: { id: id, UserId: userId } });
    if (!todo) return res.status(404).json({ message: 'error not found' });
    return res.status(200).json(todo);
  } catch (error) {
    return res.status(500).json(error);
  }
};

exports.update = async (req, res) => {
  const id = req.params.id;
  const userId = req.user.id;
  const body = {
    title: req.body.title,
    description: req.body.description,
    status: req.body.status,
    due_date: req.body.due_date,
  };

  try {
    const isFound = await Todo.findOne({ where: { id: id, UserId: userId } });
    if (!isFound) return res.status(404).json({ message: 'error not found' });
    else {
      const todo = await Todo.update(body, { where: { id: id } });
      return res.status(200).json(isFound);
    }
  } catch (error) {
    return res.status(500).json(error);
  }
};

exports.updateStatus = async (req, res) => {
  const id = req.params.id;
  const userId = req.user.id;
  const status = req.body.status;

  try {
    const isFound = await Todo.findOne({ where: { id: id, UserId: userId } });
    if (!isFound) return res.status(404).json({ message: 'error not found' });
    else {
      const todo = await Todo.update(
        { status: status },
        { where: { id: id }, returning: true }
      );
      return res.status(200).json(todo[1][0]);
    }
  } catch (error) {
    return res.status(500).json(error);
  }
};

exports.destroy = async (req, res) => {
  const id = req.params.id;
  const userId = req.user.id;

  try {
    const isFound = await Todo.findOne({ where: { id: id, UserId: userId } });
    if (!isFound) return res.status(404).json({ message: 'error not found' });
    else {
      const todo = await Todo.destroy({ where: { id: id } });
      return res.status(200).json({ message: 'todo success to delete' });
    }
  } catch (error) {
    return res.status(500).json(error);
  }
};

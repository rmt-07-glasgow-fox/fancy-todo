const { Todo } = require('../models');

exports.list = async (req, res, next) => {
  try {
    const userId = req.user.id;
    const todos = await Todo.findAll({ where: { UserId: userId } });
    return res.status(200).json(todos);
  } catch (err) {
    next(err);
  }
};

exports.listByProject = async (req, res, next) => {
  try {
    const userId = req.user.id;
    const projectId = req.params.idProject;
    const todos = await Todo.findAll({
      where: { UserId: userId, ProjectId: projectId },
    });
    return res.status(200).json(todos);
  } catch (err) {
    next(err);
  }
};

exports.create = async (req, res, next) => {
  const body = {
    title: req.body.title,
    description: req.body.description,
    status: req.body.status,
    due_date: req.body.due_date,
    UserId: req.user.id,
    ProjectId: req.body.ProjectId,
  };

  try {
    const todo = await Todo.create(body);
    return res.status(201).json(todo);
  } catch (err) {
    next(err);
  }
};

exports.detail = async (req, res, next) => {
  const id = req.params.id;
  const userId = req.user.id;

  try {
    const todo = await Todo.findOne({ where: { id: id, UserId: userId } });
    if (!todo) return next({ name: 'NotFound' });
    return res.status(200).json(todo);
  } catch (err) {
    next(err);
  }
};

exports.update = async (req, res, next) => {
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
    if (!isFound) return next({ name: 'NotFound' });
    else {
      const todo = await Todo.update(body, { where: { id: id } });
      return res.status(200).json(isFound);
    }
  } catch (err) {
    next(err);
  }
};

exports.updateStatus = async (req, res, next) => {
  const id = req.params.id;
  const userId = req.user.id;
  const status = req.body.status;

  try {
    const isFound = await Todo.findOne({ where: { id: id, UserId: userId } });
    if (!isFound) return next({ name: 'NotFound' });
    else {
      const todo = await Todo.update(
        { status: status },
        { where: { id: id }, returning: true }
      );
      return res.status(200).json(todo[1][0]);
    }
  } catch (err) {
    next(err);
  }
};

exports.destroy = async (req, res, next) => {
  const id = req.params.id;
  const userId = req.user.id;

  try {
    const isFound = await Todo.findOne({ where: { id: id, UserId: userId } });
    if (!isFound) return next({ name: 'NotFound' });
    else {
      const todo = await Todo.destroy({ where: { id: id } });
      return res.status(200).json({ message: 'todo success to delete' });
    }
  } catch (err) {
    next(err);
  }
};

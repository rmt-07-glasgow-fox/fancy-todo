const { Todo } = require('../models');
const { checkToken } = require('../helpers/jwt.js');

class todoController {
  static getAllTodoHandler(req, res, next) {
    const userToken = req.headers.access_token;
    const decoded = checkToken(userToken);
    Todo.findAll({ where: { UserId: decoded.id } })
      .then(dataTodo => {
        res.status(200).json(dataTodo);
      })
      .catch(err => {
        next(err);
        // res.status(500).json({ message: 'Internal Server Error' });
      });
  }

  static postTodoHandler(req, res, next) {
    const userToken = req.headers.access_token;
    const decoded = checkToken(userToken);
    const dataInputTodo = {
      UserId: decoded.id,
      title: req.body.title || null,
      description: req.body.description,
      status: false,
      due_date: req.body.due_date
    }
    Todo.create(dataInputTodo)
      .then(dataTodo => {
        return res.status(201).json(dataTodo);
      })
      .catch(err => {
        next(err);
      })
  }

  static getOneTodoHandler(req, res) {
    const id = req.params.id;
    Todo.findOne({ where: { id } })
      .then(dataTodo => {
        return res.status(200).json(dataTodo);
      })
      .catch(err => {
        return res.status(404).json(err);
      });
  }

  static putTodoHandler(req, res, next) {
    const id = req.params.id;
    const dataUpdateTodo = {
      title: req.body.title || null,
      description: req.body.description,
      status: req.body.status,
      due_date: req.body.due_date
    }
    Todo.update(dataUpdateTodo, {
      returning: true,
      where: { id }
    })
      .then(dataTodo => {
        console.log(dataTodo, 'TEST');
        if (!dataTodo || dataTodo[1].length === 0) {
          // Handle error from null and / [ 0, [] ]
          next(err);
        }
        // Get data Object
        return res.status(200).json(dataTodo[1][0]);
      })
      .catch(err => {
        next(err);
      });
  }

  static patchTodoHandler(req, res, next) {
    const id = req.params.id;
    const status = req.body.status || null;
    console.log(id, status);
    Todo.update({ status }, {
      returning: true,
      where: { id }
    })
      .then(dataTodo => {
        // console.log(dataTodo);
        if (!dataTodo || dataTodo[1].length === 0) {
          // Handle error from null or [ 0, [] ]
          next(err);
        }
        // Get data Object
        return res.status(200).json(dataTodo[1][0]);
        // return res.status(200).json(dataTodo);
      })
      .catch(err => {
        next(err);
      });
  }

  static deleteTodoHandler(req, res, next) {
    const id = req.params.id;
    Todo.destroy({ where: { id } })
      .then(dataTodo => {
        if (!dataTodo) {
          // Handle error from null or [ 0, [] ]
          next(err);
        }
        return res.status(200).json({ message: 'Todo Success to delete' });
      })
      .catch(err => {
        // Handle error from server or [ 0 ]
        next(err);
      });
  }
}

module.exports = todoController;
const {
  Todo
} = require('../models');

class TodoController {
  static postCreateTodo(req, res, next) {
    const {
      title,
      description,
      status,
      dueDate
    } = req.body;
    let newTodo = {
      title,
      description,
      status,
      dueDate,
      UserId: req.user.id
    }
    Todo
      .create(newTodo)
      .then(todo => {
        return res.status(201).json(todo)
      })
      .catch(err => {
        next(err)
      })
  }
  static getTodos(req, res, next) {
    Todo
      .findAll()
      //   })
      .then((todos) => {
        return res.status(200).json({
          todos,
        })
      })
      .catch(err => {
        next(err);
      })
  }
  static getTodoId(req, res) {
    const id = req.params.id;
    Todo
      .findByPk(id)
      .then(todo => {
        if (todo) {
          res.status(200).json(todo)
        } else {
          name: "TodoNotFound"
        }
      })
      .catch(err => {
        next(err);
        // res.status(500).json({message: `internal server error`})
      })

  }
  static editTodo(req, res, next) {
    const id = req.params.id
    const {
      title,
      description,
      status,
      dueDate
    } = req.body
    let newEditTodo = {
      title,
      description,
      status,
      dueDate
    }

    Todo
      .update(newEditTodo, {
        where: {
          id
        },
        returning: true
      })
      .then(todo => {
        if (todo) {
          // [1]?
          res.status(200).json(todo[1]);
        } else {
          next({
            name: "TodoNotFound"
          });
        }
      })
      .catch(err => {
        next(err)
      });
  }
  static updateTodo(req, res, next) {
    const id = req.params.id;
    const {
      status
    } = req.body;
    Todo
      .update({
        status
      }, {
        where: {
          id
        },
        returning: true
      })
      .then(todo => {
        if (todo) {
          res.status(200).json(todo[1]);
        } else {
          next({
            name: "TodoNotFound"
          });
        }
      })
      .catch(err => {
        next(err);
      });
  }
  static deleteTodo(req, res, next) {
    const id = req.params.id;

    Todo
      .destroy({
        where: {
          id
        }
      })
      .then(todo => {
        if (todo === 1) {
          res.status(200).json({
            message: "Successfully delete your todo"
          });
        } else {
          next({
            name: "TodoNotFound"
          })
        }
      })
      .catch(err => {
        next(err);
      })
  }
}

module.exports = TodoController;
const { Todo } = require("../models");

class TodoController {
  static home(req, res) {
    res.send("Welcome to Fancy ToDo");
  }

  static addTodo(req, res, next) {
    let { title, description, status, due_date } = req.body;

    let newTodo = {
      title,
      description,
      status,
      due_date,
      UserId: req.user.id,
    };

    Todo.create(newTodo)
      .then((added) => {
        return res.status(201).json(added);
      })
      .catch((err) => {
        next(err);
      });
  }

  static listTodo(req, res, next) {
    Todo.findAll()
      .then((todoList) => {
        return res.status(200).json(todoList);
      })
      .catch((err) => {
        next(err);
      });
  }

  static detailTodo(req, res, next) {
    const id = +req.params.id;
    Todo.findByPk(id)
      .then((todoData) => {
        if (todoData) {
          return res.status(200).json(todoData);
        }
        next({
          name: "NotFound",
        });
      })
      .catch((err) => {
        next(err);
      });
  }

  static updateTodo(req, res, next) {
    const id = +req.params.id;
    const { title, description, status, due_date } = req.body;

    Todo.update(
      {
        title,
        description,
        status,
        due_date,
      },
      {
        where: { id },
        returning: true,
      }
    )
      .then((result) => {
        if (result) {
          return res.status(200).json(result[1]);
        } else {
          next({
            name: "NotFound",
          });
        }
      })
      .catch((err) => {
        next(err);
      });
  }

  static changeStatusTodo(req, res, next) {
    const id = +req.params.id;
    const { status } = req.body;

    Todo.update(
      {
        status,
      },
      {
        where: { id },
        returning: true,
      }
    )
      .then((result) => {
        if (result) {
          return res.status(200).json(result[1]);
        } else {
          next({
            name: "NotFound",
          });
        }
      })
      .catch((err) => {
        next(err);
      });
  }

  static deleteTodo(req, res, next) {
    const id = +req.params.id;

    Todo.destroy({
      where: { id },
    })
      .then((result) => {
        if (result === 1) {
          return res.status(200).json({
            message: "Todo is successfully deleted",
          });
        } else {
          next({
            name: "NotFound",
          });
        }
      })
      .catch((err) => {
        next(err);
      });
  }
}

module.exports = TodoController;

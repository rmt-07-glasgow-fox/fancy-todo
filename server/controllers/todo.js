const { Todo } = require("../models");
const axios = require("axios");
const nameSplit = require("../helpers/nameSplit");

class TodoController {
  static home(req, res) {
    axios
      .get("https://icanhazdadjoke.com/", {
        headers: {
          Accept: "application/json",
        },
      })
      .then(({ data }) => {
        res.status(200).json({
          message: "Greetings!",
          joke: data.joke,
        });
      })
      .catch((err) => {
        res.send(err);
      });
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

    Todo.findAll({
      where: {
        UserId: req.user.id,
      },
      order: [
        ['status', 'ASC'],
        ['due_date', 'ASC'],
      ]
    })
      .then((todoList) => {
        return res.status(200).json({
          todoList,
        });
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
        if (result[0] === 1) {
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
        if (result[0] === 1) {
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

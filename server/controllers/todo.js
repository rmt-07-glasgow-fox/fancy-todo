const { Todo } = require("../models");

class TodoController {
  static home(req, res) {
    res.send("Welcome to Fancy ToDo");
  }

  static addTodo(req, res) {
    let { title, description, status, due_date } = req.body;

    let newTodo = {
      title,
      description,
      status,
      due_date,
      UserId: req.user.id
    };

    Todo.create(newTodo)
      .then((added) => {
        return res.status(201).json(added);
      })
      .catch((err) => {
        if (err.name === "SequelizeValidationError") {
          return res.status(400).json(err.errors);
        }
        return res.status(500).json({
          message: "Internal Server Error",
        });
      });
  }

  static listTodo(req, res) {
    Todo.findAll()
      .then((todoList) => {
        return res.status(200).json(todoList);
      })
      .catch((err) => {
        return res.status(500).json({
          message: "Internal Server Error",
        });
      });
  }

  static detailTodo(req, res) {
    const id = +req.params.id;
    Todo.findByPk(id)
      .then((todoData) => {
        if (todoData) {
          return res.status(200).json(todoData);
        }
        return res.status(404).json({
          message: "Todo not found",
        });
      })
      .catch((err) => {
        return res.status(500).json({
          message: "Internal Server Error",
        });
      });
  }

  static updateTodo(req, res) {
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
      }
    )
      .then((result) => {
        if (result[0] === 1) {
          return Todo.findByPk(id).then((updated) => {
            return res.status(200).json(updated);
          });
        }
        return res.status(404).json({ message: "Todo not found" });
      })
      .catch((err) => {
        if (err.name === "SequelizeValidationError") {
          return res.status(400).json(err.errors);
        }
        return res.status(500).json({
          message: "Internal Server Error",
        });
      });
  }

  static changeStatusTodo(req, res) {
    const id = +req.params.id;
    const { status } = req.body;

    Todo.update(
      {
        status,
      },
      {
        where: { id },
      }
    )
      .then((result) => {
        if (result[0] === 1) {
          return Todo.findByPk(id).then((updated) => {
            return res.status(200).json(updated);
          });
        }
        return res.status(404).json({ message: "Todo not found" });
      })
      .catch((err) => {
        if (err.name === "SequelizeValidationError") {
          return res.status(400).json(err.errors);
        }
        return res.status(500).json({
          message: "Internal Server Error",
        });
      });
  }

  static deleteTodo(req, res) {
    const id = +req.params.id;

    Todo.destroy({
      where: { id },
    })
    .then(result => {
      if(result === 1) {
        return res.status(200).json({message: "Todo is successfully deleted"})
      }
      return res.status(404).json({ message: "Todo not found" });
    })
    .catch((err) => {
      return res.status(500).json({
        message: "Internal Server Error",
      });
    });
  }
}

module.exports = TodoController;

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
      .then((updated) => {
        if (updated[0] === 1) {
          return res.status(200).json(updated);
        }
        return res.status(404).json({ message: "Todo not found" });
      })
      .catch((err) => {
        if (err.name === "SequelizeValidationError") {
          return res.status(400).json(err.errors);
        }
        return res.status(500).json(err);
      });
  }

  static changeStatusTodo(req, res) {
    const id = +req.params.id;
    const { status } = req.body;

    
  }

  static deleteTodo(req, res) {
    res.send("ini list todo");
  }
}

module.exports = TodoController;

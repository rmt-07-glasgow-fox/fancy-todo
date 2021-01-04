const { Todo } = require('../models');

class todoController {
  static getAssetHandlers(req, res) {
    Todo.findAll()
      .then(dataTodo => {
        res.status(201).json(dataTodo);
      })
      .catch(err => {
        res.status(500).json({ message: 'Internal Server Error' });
      });
  }
}

module.exports = todoController;
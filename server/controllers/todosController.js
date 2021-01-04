const { Todo } = require('../models');

class todosController {
    static async getTodos (req, res) {
        try {
            let data = await Todo.findAll();

            return res.status(200).json(data);
        } catch (err) {
            return res.status(500).json('Error');
        }
    }
}

module.exports = todosController;
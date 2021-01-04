const { Todo } = require('../models');

class todosController {
    static async getTodos (req, res) {
        try {
            let data = await Todo.findAll();

            return res.status(200).json(data);
        } catch (err) {
            return res.status(500).json('Server Error');
        }
    }

    static async postTodos (req, res) {
        try {
            let data = await Todo.create(req.body);

            return res.status(201).json(data);
        } catch (err) {
            if (err.errors) {
                let msg = [];

                await err.errors.forEach(e => {
                    msg.push(e.message);
                });

                return res.status(404).json({ name: 'Validation Error', msg: msg });
            }

            return res.status(500).json('Server Error');
        }
    }

    static async getTodoById (req, res) {
        try {
            let data = await Todo.findByPk(req.params.id);

            if (!data) {
                return res.status(404).json(`Cannot found data with id ${req.params.id}`);
            }

            return res.status(200).json(data);
        } catch (err) {
            return res.status(500).json('Serever Error');
        }
    }
}

module.exports = todosController;
const { Todo } = require('../models');

class todosController {
    static async getTodos (req, res) {
        try {
            let data = await Todo.findAll({ attributes: { exclude: ['createdAt', 'updatedAt'] } });

            return res.status(200).json(data);
        } catch (err) {
            return res.status(500).json('Server Error');
        }
    }

    static async postTodos (req, res) {
        try {
            let data = await Todo.create(req.body);

            data = {
                id: data.id,
                title: data.title,
                description: data.description,
                status: data.status,
                dueDate: data.dueDate
            };

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
                return res.status(404).json({ msg: `Cannot found data with id ${req.params.id}` });
            }

            data = {
                id: data.id,
                title: data.title,
                description: data.description,
                status: data.status,
                dueDate: data.dueDate
            };

            return res.status(200).json(data);
        } catch (err) {
            return res.status(500).json('Server Error');
        }
    }

    static async putTodo (req, res) {
        try {
            let data = await Todo.update({
                title: req.body.title,
                description: req.body.description,
                status: req.body.status,
                dueDate: req.body.dueDate
            }, {
                where: { id: req.params.id }
            });

            if (!data[0]) {
                return res.status(404).json({ msg: `Data with id ${req.params.id} not found` });
            }

            data = await Todo.findByPk(req.params.id);

            data = {
                id: data.id,
                title: data.title,
                description: data.description,
                status: data.status,
                dueDate: data.dueDate
            };

            return res.status(200).json(data);
        } catch (err) {
            if (err.errors) {
                let msg = [];

                await err.errors.forEach(e => {
                    msg.push(e.message);
                });

                return res.status(400).json({ name: 'Validation Error', msg: msg });
            }

            return res.status(500).json('Server Error');
        }
    }

    static async patchTodo (req, res) {
        try {
            let data = await Todo.update({
                status: req.body.status
            }, {
                where: {
                    id: req.params.id
                }
            });

            if (!data[0]) {
                return res.status(404).json({ msg: `Data with id ${req.params.id} not found` });
            }

            data = await Todo.findByPk(req.params.id);

            data = {
                id: data.id,
                title: data.title,
                description: data.description,
                status: data.status,
                dueDate: data.dueDate
            };

            return res.status(200).json(data);
        } catch (err) {
            if (err.errors) {
                let msg = [];

                await err.errors.forEach(e => {
                    msg.push(e.message);
                });

                return res.status(400).json({ name: 'Validation Error', msg: msg });
            }

            return res.status(500).json('Server Error');
        }
    }

    static async deleteTodo (req, res) {
        try {
            let data = await Todo.destroy({ where: { id: req.params.id } });

            if (!data) {
                return res.status(404).json({ msg: `Data with id ${req.params.id} not found` });
            }

            return res.status(200).json('Todo success to delete');
        } catch (err) {
            return res.status(500).json('Server Error');
        }
    }
}

module.exports = todosController;
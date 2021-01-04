const { Todo } = require('../models');

class todosController {
    static async getTodos (req, res, next) {
        try {
            let data = await Todo.findAll({ attributes: { exclude: ['createdAt', 'updatedAt'] } });

            return res.status(200).json(data);
        } catch (err) {
            return next({ code: 500 });
        }
    }

    static async postTodos (req, res, next) {
        try {
            let data = {
                title: req.body.title,
                description: req.body.description,
                status: req.body.status,
                dueDate: req.body.dueDate
            };

            data = await Todo.create(data);

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
                return next({ code: 400, name: 'Validation Error', msg: err });
            }

            return next({ code: 500 });
        }
    }

    static async getTodoById (req, res, next) {
        try {
            let data = await Todo.findByPk(req.params.id);

            if (!data) {
                return next({ code: 404, msg: `Cannot found data with id ${req.params.id}` });
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
            return next({ code: 500 });
        }
    }

    static async putTodo (req, res, next) {
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
                return next({ code: 404, msg: `Data with id ${req.params.id} not found` });
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
                return next({ code: 400, name: 'Validation Error', msg: err });
            }

            return next({ code: 500 });
        }
    }

    static async patchTodo (req, res, next) {
        try {
            let data = await Todo.update({
                status: req.body.status
            }, {
                where: {
                    id: req.params.id
                }
            });

            if (!data[0]) {
                return next({ code: 404, msg: `Data with id ${req.params.id} not found` });
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
                return next({ code: 400, name: 'Validation Error', msg: err });
            }

            return next({ code: 500 });
        }
    }

    static async deleteTodo (req, res, next) {
        try {
            let data = await Todo.destroy({ where: { id: req.params.id } });

            if (!data) {
                return next({ code: 404, msg: `Data with id ${req.params.id} not found` });
            }

            return res.status(200).json('Todo success to delete');
        } catch (err) {
            return next({ code: 500 });
        }
    }
}

module.exports = todosController;
const { Todo } = require('../models');

class TodoController {
    static async getAll(req, res) {
        try {
            const data = await Todo.findAll({
                attributes: { exclude: ['createdAt', 'updatedAt'] }
            })
            return res.status(200).json({
                status: 'success',
                data
            })
        } catch (err) {
            return res.status(500).json({
                status: 'error',
                message: err.message
            })
        }
    }

    static async get(req, res) {
        try {
            const data = await Todo.findByPk(+req.params.id, {
                attributes: { exclude: ['createdAt', 'updatedAt'] }
            });

            if (!data) {
                return res.status(404).json({
                    status: 'error',
                    message: 'todo not found'
                })
            }

            return res.status(200).json({
                status: 'success',
                data
            })
        } catch (err) {
            return res.status(500).json({
                status: 'error',
                message: err.message
            })
        }
    }

    static async store(req, res) {
        const { title, description, status, due_date } = req.body;
        const input = { title, description, status, due_date, userId: req.user.id };

        try {
            const data = await Todo.create(input);

            return res.status(201).json({
                status: 'success',
                data
            })

        } catch (err) {
            if (err.name = "SequelizeValidationError") {
                let temp = [];

                if (err.errors.length > 0) {
                    err.errors.forEach(el => temp.push(el.message))

                    return res.status(400).json({
                        status: 'error',
                        message: temp
                    })
                }
            }

            return res.status(500).json({
                status: 'error',
                message: err.message
            })
        }
    }

    static async update(req, res) {
        const id = req.params.id;
        const { title, description, status, due_date } = req.body;
        const input = { title, description, status, due_date };

        try {
            const data = await Todo.findByPk(id, {
                attributes: { exclude: ['createdAt', 'updatedAt'] }
            });
            if (!data) {
                return res.status(404).json({
                    status: 'error',
                    message: 'todo not found'
                })
            }

            await Todo.update(input, { where: { id } })

            return res.status(200).json({
                status: 'success',
                message: 'todo updated successfully',
                data
            })
        } catch (err) {
            if (err.name = "SequelizeValidationError") {
                let temp = [];

                if (err.errors.length > 0) {
                    err.errors.forEach(el => temp.push(el.message))

                    return res.status(400).json({
                        status: 'error',
                        message: temp
                    })
                }
            }

            return res.status(500).json({
                status: 'error',
                message: err.message
            })
        }
    }

    static async updateStatus(req, res) {
        const id = req.params.id
        const { status } = req.body;
        const input = { status };

        try {
            const data = await Todo.findByPk(id, {
                attributes: { exclude: ['createdAt', 'updatedAt'] }
            })

            if (!data) {
                return res.status(404).json({
                    status: 'error',
                    message: 'todo not found'
                })
            }

            await Todo.update(input, { where: { id } })

            return res.status(200).json({
                status: 'success',
                message: 'todo updated successfully',
                data
            })
        } catch (err) {
            if (err.name = "SequelizeValidationError") {
                let temp = [];

                if (err.errors.length > 0) {
                    err.errors.forEach(el => temp.push(el.message))

                    return res.status(400).json({
                        status: 'error',
                        message: temp
                    })
                }
            }

            return res.status(500).json({
                status: 'error',
                message: err.message
            })
        }
    }

    static async destroy(req, res) {
        try {
            const data = await Todo.findByPk(+req.params.id);

            if (!data) {
                return res.status(404).json({
                    status: 'error',
                    message: 'todo not found'
                })
            }

            data.destroy();

            return res.status(200).json({
                status: 'success',
                message: 'todo successfully deleted'
            })

        } catch (err) {
            return res.status(500).json({
                status: 'error',
                message: err.message
            })
        }
    }
}

module.exports = TodoController;
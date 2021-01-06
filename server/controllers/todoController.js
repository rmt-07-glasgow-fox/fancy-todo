const { Todo } = require('../models');

class TodoController {
    static async getAll(req, res, next) {
        try {
            const data = await Todo.findAll({
                where: { userId: req.user.id },
                attributes: { exclude: ['createdAt', 'updatedAt'] },
                order: [
                    ['title', 'asc'],
                    ['status', 'asc']

                ]
            })
            return res.status(200).json({
                status: 'success',
                data
            })
        } catch (err) {
            return next(err)
        }
    }

    static async get(req, res, next) {
        try {
            const data = await Todo.findByPk(+req.params.id, {
                attributes: { exclude: ['createdAt', 'updatedAt'] }
            });

            if (!data) return next({ name: 'notFound' })

            return res.status(200).json({
                status: 'success',
                data
            })
        } catch (err) {
            return next(err)
        }
    }

    static async store(req, res, next) {
        try {
            const { title, description, status, due_date } = req.body;
            const input = { title, description, status, due_date, userId: req.user.id };
            const data = await Todo.create(input);

            return res.status(201).json({
                status: 'success',
                data
            })

        } catch (err) {
            return next(err)
        }
    }

    static async update(req, res, next) {
        try {
            const id = req.params.id;
            const { title, description, status, due_date } = req.body;
            const input = { title, description, status, due_date };

            const data = await Todo.findByPk(id, {
                attributes: { exclude: ['createdAt', 'updatedAt'] }
            });

            if (!data) return next({ name: 'notFound' })

            await Todo.update(input, { where: { id } })
            await data.reload();

            return res.status(200).json({
                status: 'success',
                message: 'todo updated successfully',
                data
            })

        } catch (err) {
            return next(err)
        }
    }

    static async updateStatus(req, res, next) {
        try {
            const id = req.params.id
            const { status } = req.body;
            const input = { status };
            const data = await Todo.findByPk(id, {
                attributes: { exclude: ['createdAt', 'updatedAt'] }
            })

            if (!data) return next({ name: 'notFound' })

            await Todo.update(input, { where: { id } })
            await data.reload();


            return res.status(200).json({
                status: 'success',
                message: 'todo updated successfully',
                data
            })
        } catch (err) {
            return next(err)
        }
    }

    static async destroy(req, res) {
        try {
            const data = await Todo.findByPk(+req.params.id);

            if (!data) return next({ name: 'notFound' })

            data.destroy();

            return res.status(200).json({
                status: 'success',
                message: 'todo successfully deleted'
            })

        } catch (err) {
            return next(err)
        }
    }
}

module.exports = TodoController;
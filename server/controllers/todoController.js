const { Todo } = require('../models');

class TodoController {
    static getAll(req, res) {
        Todo.findAll()
            .then(data => {
                res.status(200).json({
                    status: 'success',
                    data
                })
            })
            .catch(err => {
                res.status(500).json({
                    status: 'error',
                    message: "Invalid server error"
                })
            })
    }

    static get(req, res) {
        Todo.findByPk(+req.params.id)
            .then(data => {
                if (!data) {
                    res.status(404).json({
                        status: 'error',
                        message: 'todo not found'
                    })
                }

                res.status(200).json({
                    status: 'success',
                    data
                })
            })
            .catch(err => {
                res.status(500).json({
                    status: 'error',
                    message: err.message
                })
            })
    }

    static store(req, res) {
        const { title, description, status, due_date } = req.body;
        const input = { title, description, status, due_date };

        Todo.create(input)
            .then(data => {
                res.status(201).json({
                    status: 'success',
                    data
                })
            })
            .catch(err => {
                let temp = [];

                if (err.errors.length > 0) {
                    err.errors.forEach(el => {
                        temp.push(el.message);
                    })

                    res.status(400).json({
                        status: 'error',
                        message: temp
                    })
                }

                res.status(500).json({
                    status: 'error',
                    message: err.message
                })
            });
    }

    static update(req, res) {
        const id = req.params.id;
        const { title, description, status, due_date } = req.body;
        const input = { title, description, status, due_date };

        Todo.findByPk(id)
            .then(data => {
                if (!data) {
                    res.status(404).json({
                        status: 'error',
                        message: 'todo not found'
                    })
                }
                return Todo.update(input, { where: { id } })
            })
            .then(data => {
                res.status(200).json({
                    status: 'success',
                    message: 'todo updated successfully'
                })
            })
            .catch(err => {
                let temp = [];

                if (err.errors.length > 0) {
                    err.errors.forEach(el => {
                        temp.push(el.message);
                    })

                    res.status(400).json({
                        status: 'error',
                        message: temp
                    })
                }

                res.status(500).json({
                    status: 'error',
                    message: err.message
                })
            });
    }

    static updateStatus(req, res) {
        const id = req.params.id
        const { status } = req.body;
        const input = { status };

        Todo.findByPk(id)
            .then(data => {
                if (!data) {
                    res.status(404).json({
                        status: 'error',
                        message: 'todo not found'
                    })
                }
                return Todo.update(input, { where: { id } })
            })
            .then(data => {
                res.status(200).json({
                    status: 'success',
                    message: 'todo updated successfully'
                })
            })
            .catch(err => {
                let temp = [];

                if (err.errors.length > 0) {
                    err.errors.forEach(el => {
                        temp.push(el.message);
                    })

                    res.status(400).json({
                        status: 'error',
                        message: temp
                    })
                }

                res.status(500).json({
                    status: 'error',
                    message: err.message
                })
            });
    }

    static destroy(req, res) {
        Todo.findByPk(+req.params.id)
            .then(data => {
                if (!data) {
                    res.status(404).json({
                        status: 'error',
                        message: 'todo not found'
                    })
                }

                data.destroy();
                res.status(200).json({
                    status: 'success',
                    message: 'todo successfully deleted'
                })
            })
            .catch(err => {
                res.status(500).json({
                    status: 'error',
                    message: err.message
                })
            })
    }
}

module.exports = TodoController;
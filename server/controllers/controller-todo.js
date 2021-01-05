const { Todo } = require('../models')

class Controller {
    static showAllTodos(req, res) {
        Todo.findAll({
            attributes: { exclude: ['createdAt', 'updatedAt', 'user_id'] }
        })
            .then(data => {
                res.status(200).json(data)
            })
            .catch(err => {
                res.status(500).json({ message: 'internal server error' })
            })
    }

    static createTodos(req, res) {
        const todo = {
            title: req.body.title,
            description: req.body.description,
            status: req.body.status,
            due_date: req.body.due_date,
            user_id: 1,
            createdAt: new Date(),
            updatedAt: new Date()
        }

        console.log(todo)

        Todo.create(todo)
            .then(data => {
                res.status(201).json(data)
            })
            .catch(err => {
                const messageError = err.message.split(',')[0]
                const code = +err.message.split(',')[1]

                if (code === 400) {
                    res.status(400).json({ message: messageError })
                } else {
                    res.status(500).json({ message: 'internal server error' })
                }
            })
    }

    static showById(req, res) {
        const id = req.params.id

        Todo.findOne({
            where: { id }
        })
            .then(data => {
                if (data) {
                    res.status(200).json(data)
                } else {
                    res.status(404).json({ message: 'todo item not found' })
                }
            })
            .catch(err => {
                res.status(500).json({ message: 'internal server error' })
            })
    }

    static updateTodos(req, res) {
        const id = req.params.id

        Todo.findOne({
            where: { id }
        })
            .then(data => {
                if (!data) {
                    res.status(404).json({ message: 'todo item not found' })
                }

                const todo = {
                    title: req.body.title,
                    description: req.body.description,
                    status: req.body.status,
                    due_date: req.body.due_date,
                    user_id: 1,
                    createdAt: new Date(),
                    updatedAt: new Date()
                }

                return Todo.update(todo, {
                    where: { id },
                    returning: true
                })

            })
            .then(data => {
                res.status(200).json(data[1][0])
            })
            .catch(err => {
                const messageError = err.message.split(',')[0]
                const code = +err.message.split(',')[1]

                if (code === 400) {
                    res.status(400).json({ message: messageError })
                } else {
                    res.status(500).json({ message: 'internal server error' })
                }
            })
    }

    static changeStatus(req, res) {
        const id = req.params.id

        Todo.findOne({
            where: { id }
        })
            .then(data => {
                if (!data) {
                    res.status(404).json({ message: 'todo item not found' })
                }

                const todo = {
                    title: data.title,
                    description: data.description,
                    status: req.body.status,
                    due_date: data.due_date,
                    user_id: 1,
                    createdAt: new Date(),
                    updatedAt: new Date()
                }

                return Todo.update(todo, {
                    where: { id },
                    returning: true
                })

            })
            .then(data => {
                res.status(200).json(data[1][0])
            })
            .catch(err => {
                const messageError = err.message.split(',')[0]
                const code = +err.message.split(',')[1]

                if (code === 400) {
                    res.status(400).json({ message: messageError })
                } else {
                    res.status(500).json({ message: 'internal server error' })
                }
            })
    }

    static deleteTodos(req, res) {
        const id = req.params.id

        Todo.findOne({
            where: { id }
        })
            .then(data => {
                if (!data) {
                    res.status(404).json({ message: 'todo item not found' })
                }

                return Todo.destroy({
                    where: { id }
                })
            })
            .then(data => {
                res.status(200).json({message: 'todo successfully deleted'})
            })
            .catch(err => {
                res.status(500).json({ message: 'internal server error' })
            })
    }
}

module.exports = Controller
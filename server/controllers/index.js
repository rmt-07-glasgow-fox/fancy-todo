const { Todo } = require('../models')

class Controller {
    static home(req, res) {
        res.send('welcome !')
    }

    static async todoAdd(req, res) {
        let body = req.body

        try {
            let data = await Todo.create(body)
            res.status(200).send(data)
        } catch (err) {
            let errorMessage = err.errors ? err.errors.map(error => error.message) : ''
            res.status(500).send(errorMessage)
        }
    }

    static async todoList(req, res) {
        try {
            let data = await Todo.findAll({ order: [['due_date', 'ASC']] })
            res.status(200).send(data)
        } catch (err) {
            res.status(500).send(err)
        }
    }

    static async todoById(req, res) {
        try {
            let id = req.params.id

            let data = await Todo.findByPk(id)
            res.status(200).send(data)

        } catch (err) {
            res.status(500).send(err)
        }
    }
}

module.exports = Controller
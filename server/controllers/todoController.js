const { Todo } = require('../models')

class TodoController {
    static home(req, res) {
        return res.send('welcome !')
    }

    static async todoAdd(req, res) {
        try {
            let body = req.body
            let data = await Todo.create(body)
            let response = {
                id: data.id,
                status: data.status,
                title: data.title,
                description: data.description,
                due_date: data.due_date
            }

            return res.status(201).json(response)
        } catch (err) {
            // console.log(err)

            if (err.name === "SequelizeValidationError") {
                let errorMessage = err.errors.map(error => error.message)
                return res.status(400).json(errorMessage)
            }

            return res.status(500).send(err)
        }
    }

    static async todoList(req, res) {
        try {
            let data = await Todo.findAll({
                order: [['id', 'ASC']],
                attributes: {
                    // include: ['id', 'title', 'description', 'status', 'due_date'],
                    exclude: ['createdAt', 'updatedAt']
                }
            })

            // console.log(data)
            return res.status(200).json(data)
        } catch (err) {
            return res.status(500).send(err)
        }
    }

    static async todoById(req, res) {
        try {
            let id = +req.params.id

            let data = await Todo.findByPk(id, {
                attributes: {
                    // include: ['id', 'title', 'description', 'status', 'due_date'],
                    exclude: ['createdAt', 'updatedAt']
                }
            })

            // console.log('data : ', data)
            data ? res.status(200).send(data) : res.status(404).json('error not found')

        } catch (err) {
            return res.status(500).send(err)
        }
    }

    static async todoUpdateAll(req, res) {
        try {
            let id = +req.params.id
            // console.log('req.body : ', req.body)

            let update = {
                title: req.body.title || '',
                description: req.body.description || '',
                due_date: new Date(req.body.due_date) || '',
                status: req.body.status === 'true' ? true : false,
            }

            let response = await Todo.update(update, { where: { id } })
            // console.log('response : ', response)
            if (response[0] > 0) {
                let updatedData = await Todo.findByPk(id, {
                    attributes: { exclude: ['createdAt', 'updatedAt'] }
                })
                return res.status(200).json(updatedData)
            }

            return res.status(404).json('error not found')

        } catch (err) {
            // console.log(err)

            if (err.name === "SequelizeValidationError") {
                let errorMessage = err.errors.map(error => error.message)
                return res.status(400).json(errorMessage)
            }

            return res.status(500).send(err)
        }
    }

    static async todoUpdateStatus(req, res) {
        try {
            let id = +req.params.id
            let updateStatus = { status: true }

            let response = await Todo.update(updateStatus, { where: { id } })
            // console.log('response : ', response)

            if (response[0] > 0) {
                let updatedData = await Todo.findByPk(id, {
                    attributes: { exclude: ['createdAt', 'updatedAt'] }
                })
                return res.status(200).json(updatedData)
            }

            return res.status(404).json('error not found')

        } catch (err) {
            // console.log(err)

            if (err.name === "SequelizeValidationError") {
                let errorMessage = err.errors.map(error => error.message)
                return res.status(400).json(errorMessage)
            }

            return res.status(500).send(err)
        }
    }

    static async todoDelete(req, res) {
        try {
            let id = +req.params.id

            let deleted = await Todo.destroy({ where: { id: id } })

            if (deleted) return res.sendStatus(200)
            if (!deleted) return res.status(404).json('error not found')

        } catch (err) {
            return res.status(500).send(err)
        }
    }
}

module.exports = TodoController
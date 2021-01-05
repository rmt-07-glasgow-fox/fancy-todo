const { Todo } = require('../models')

class TodoController {
    static home(req, res) {
        res.send('welcome !')
    }

    static async todoAdd(req, res) {
        let body = req.body

        try {
            let data = await Todo.create(body)
            res.status(201).send(data)
        } catch (err) {
            let errorMessage = err.errors ? err.errors.map(error => error.message) : ''
            res.status(400).json({ message: errorMessage })
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
            res.status(200).json(data)
        } catch (err) {
            let errorMessage = err.errors ? err.errors.map(error => error.message) : ''
            res.status(400).json({ message: errorMessage })
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
            data ? res.status(200).send(data) : res.status(200).json({ message: 'Tidak ada' })

        } catch (err) {
            let errorMessage = err.errors ? err.errors.map(error => error.message) : ''
            res.status(400).json({ message: errorMessage })
        }
    }

    static async todoUpdateAll(req, res) {
        try {
            let id = +req.params.id
            console.log('req.body : ', req.body)

            let update = {
                title: req.body.title || '',
                description: req.body.description || '',
                due_date: new Date(req.body.due_date) || '',
                status: req.body.status === 'true' ? true : false,
            }

            let response = await Todo.update(update, { where: { id } })
            // console.log('response : ', response)
            response[0] > 0 ? res.status(200).send('Berhasil update') : res.status(200).send('Id gak ada')

        } catch (err) {
            let errorMessage = err.errors ? err.errors.map(error => error.message) : ''
            res.status(400).json({ message: errorMessage })
        }
    }

    static async todoUpdateStatus(req, res) {
        try {
            let id = +req.params.id
            let update = { status: true }

            let response = await Todo.update(update, { where: { id } })
            // console.log('response : ', response)
            response[0] > 0 ? res.status(200).send('Berhasil update status') : res.status(200).json({ message: 'Id gak ada' })

        } catch (err) {
            let errorMessage = err.errors ? err.errors.map(error => error.message) : ''
            res.status(400).json({ message: errorMessage })
        }
    }

    static async todoDelete(req, res) {
        try {
            let id = +req.params.id

            let deleted = await Todo.destroy({ where: { id: id } })
            deleted ? res.sendStatus(200) : res.sendStatus(404)

        } catch (err) {
            let errorMessage = err.errors ? err.errors.map(error => error.message) : ''
            res.status(400).json({ message: errorMessage })
        }
    }
}

module.exports = TodoController
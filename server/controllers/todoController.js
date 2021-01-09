const { Todo } = require('../models')

class TodoController {
    static home(req, res) {
        return res.send('welcome !')
    }

    static async todoAdd(req, res, next) {
        try {
            // console.log('>>> req.user : ', req.user)
            let { title, description, status, due_date } = req.body
            let newTodo = {
                title: title,
                status: status,
                description: description,
                due_date: due_date,
                UserId: req.user.id
            }
            let data = await Todo.create(newTodo)

            let response = {
                id: data.id,
                status: data.status,
                title: data.title,
                description: data.description,
                due_date: data.due_date,
                UserId: data.UserId
            }

            return res.status(201).json({ message: response })
        } catch (err) {
            return next(err)
        }
    }

    static async todoList(req, res, next) {
        try {
            let response = await Todo.findAll({
                where: { UserId: req.user.id },
                order: [['id', 'ASC']],
                attributes: {
                    // include: ['id', 'title', 'description', 'status', 'due_date'],
                    exclude: ['createdAt', 'updatedAt']
                }
            })

            return res.status(200).json({ message: response })
        } catch (err) {
            return next(err)
        }
    }

    static async todoById(req, res, next) {
        try {
            let id = +req.params.id

            let response = await Todo.findByPk(id, {
                where: { UserId: req.user.id },
                attributes: {
                    // include: ['id', 'title', 'description', 'status', 'due_date'],
                    exclude: ['createdAt', 'updatedAt']
                }
            })

            if (response) {
                return res.status(200).json({ message: response })
            }

        } catch (err) {
            return next(err)
        }
    }

    static async todoUpdateAll(req, res, next) {
        try {
            let id = +req.params.id

            let update = {
                title: req.body.title || '',
                description: req.body.description || '',
                due_date: new Date(req.body.due_date) || '',
                status: req.body.status === 'true' ? true : false,
            }

            let response = await Todo.update(update, { where: { id } })
            if (response[0] > 0) {
                let updatedData = await Todo.findByPk(id, {
                    attributes: { exclude: ['createdAt', 'updatedAt'] }
                })
                return res.status(200).json({ message: updatedData })
            }

        } catch (err) {
            return next(err)
        }
    }

    static async todoUpdateStatus(req, res, next) {
        try {
            let id = +req.params.id
            let updateStatus = { status: true }
            let response = await Todo.update(updateStatus, { where: { id } })

            if (response[0] > 0) {
                let updatedData = await Todo.findByPk(id, {
                    attributes: { exclude: ['createdAt', 'updatedAt'] }
                })
                return res.status(200).json({ message: updatedData })
            }

        } catch (err) {
            return next(err)
        }
    }

    static async todoDelete(req, res, next) {
        try {
            let id = +req.params.id
            let deleted = await Todo.destroy({ where: { id: id } })
            if (deleted) {
                return res.sendStatus(200)
            }

        } catch (err) {
            return next(err)
        }
    }
}

module.exports = TodoController
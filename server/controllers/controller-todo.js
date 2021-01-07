const { Todo } = require('../models')
const formatDate = require('../helpers/format-date')

class Controller {
    static showAllTodos(req, res, next) {
        Todo.findAll({
            where: { user_id: req.userId },
            attributes: { exclude: ['createdAt', 'updatedAt', 'user_id'] }
        })
            .then(data => {
                res.status(200).json(data)
            })
            .catch(err => {
                //res.status(500).json({ message: 'internal server error' })
                next({
                    message: 'Internal server error',
                    code: 500,
                    from: 'Controller Todo: show all todos'
                })
            })
    }

    static createTodos(req, res, next) {
        const todo = {
            title: req.headers.title,
            description: req.headers.description,
            status: 'undone',
            due_date: formatDate(req.headers.due_date),
            user_id: req.userId,
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
                    //res.status(400).json({ message: messageError })
                    next({
                        message: messageError,
                        code: 400,
                        from: 'Controller Todo: create todos'
                    })
                } else {
                    //res.status(500).json({ message: 'internal server error' })
                    next({
                        message: 'Internal server error',
                        code: 500,
                        from: 'Controller Todo: create todos'
                    })
                }
            })
    }

    static showById(req, res, next) {
        const id = req.params.id

        Todo.findOne({
            where: { id }
        })
            .then(data => {
                if (data) {
                    res.status(200).json(data)
                } else {
                    //res.status(404).json({ message: 'todo item not found' })
                    next({
                        message: 'Item not found',
                        code: 404,
                        from: 'Controller Todo: find by id todos'
                    })
                }
            })
            .catch(err => {
                //res.status(500).json({ message: 'internal server error' })
                next({
                    message: 'Internal server error',
                    code: 500,
                    from: 'Controller Todo: find by id todos'
                })
            })
    }

    static updateTodos(req, res, next) {
        const id = req.params.id

        Todo.findOne({
            where: { id }
        })
            .then(data => {
                if (!data) {
                    //res.status(404).json({ message: 'todo item not found' })
                    next({
                        message: 'Item not found',
                        code: 404,
                        from: 'Controller Todo: update todos'
                    })
                }

                const todo = {
                    title: req.body.title,
                    description: req.body.description,
                    status: req.body.status,
                    due_date: req.body.due_date,
                    user_id: req.userId,
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
                    //res.status(400).json({ message: messageError })
                    next({
                        message: messageError,
                        code: 400,
                        from: 'Controller Todo: update todos'
                    })
                } else {
                    //res.status(500).json({ message: 'internal server error' })
                    next({
                        message: 'Internal server error',
                        code: 500,
                        from: 'Controller Todo: update todos'
                    })
                }
            })
    }

    static changeStatus(req, res, next) {
        const id = req.params.id

        Todo.findOne({
            where: { id }
        })
            .then(data => {
                if (!data) {
                    //res.status(404).json({ message: 'todo item not found' })
                    next({
                        message: 'Item not found',
                        code: 404,
                        from: 'Controller Todo: change status todos'
                    })
                }

                const todo = {
                    title: data.title,
                    description: data.description,
                    status: req.body.status,
                    due_date: data.due_date,
                    user_id: req.userId,
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
                    //res.status(400).json({ message: messageError })
                    next({
                        message: messageError,
                        code: 400,
                        from: 'Controller Todo: change status todos'
                    })
                } else {
                    //res.status(500).json({ message: 'internal server error' })
                    next({
                        message: 'Internal server error',
                        code: 500,
                        from: 'Controller Todo: change status todos'
                    })
                }
            })
    }

    static deleteTodos(req, res, next) {
        const id = req.params.id

        Todo.findOne({
            where: { id }
        })
            .then(data => {
                if (!data) {
                    //res.status(404).json({ message: 'todo item not found' })
                    next({
                        message: 'Item not found',
                        code: 404,
                        from: 'Controller Todo: delete todos'
                    })
                }

                return Todo.destroy({
                    where: { id }
                })
            })
            .then(data => {
                res.status(200).json({ message: 'todo successfully deleted' })
            })
            .catch(err => {
                //res.status(500).json({ message: 'internal server error' })
                next({
                    message: 'Internal server error',
                    code: 500,
                    from: 'Controller Todo: delete todos'
                })
            })
    }
}

module.exports = Controller
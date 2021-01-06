const { Todo } = require('../models')

class TodoController {
    static createTodo(req, res) {
        let obj = {
            title: req.body.title,
            description: req.body.description,
            status: req.body.status,
            due_date: req.body.due_date,
            UserId: req.user.id
        }

        Todo.create(obj)
        .then(data => {
            res.status(201).json(data)
        })
        .catch(err => {
            if (err.name === 'SequelizeValidationError') {
                let eror = []
                err.errors.forEach(e => {
                    eror.push(e.message)
                });
                res.status(400).json(eror)
            } else {
                res.status(500).json({message: 'internal server error'})
            }
        })
    }

    static listTodo(req, res) {
        Todo.findAll()
        .then(todos => {
            res.status(200).json(todos)
        })
        .catch(err => {
            res.status(500).json({message: 'internal server error'})
        })
    }

    static selectTodo(req, res) {
        let id = +req.params.id

        Todo.findByPk(id)
        .then(todo => {
            if (todo === null) {
                res.status(404).json({message: 'error not found'})
            } else {
                res.status(200).json(todo)
            }
        })
        .catch(err => {
            res.status(500).json({message: 'internal server error'})
        })
    }

    static updateTodo(req, res) {
        let updatedTodo = {
            title: req.body.title,
            description: req.body.description,
            status: req.body.status,
            due_date: req.body.due_date
        }
        let id = +req.params.id

        Todo.update(updatedTodo, {
            where: {id}
        })
        .then(todo => {
            if (todo[0] === 0) {
                res.status(404).json({message: 'error not found'})
            } else {
                res.status(200).json(req.body)
            }
        })
        .catch(err => {
            if (err.name === 'SequelizeValidationError') {
                let eror = []
                err.errors.forEach(e => {
                    eror.push(e.message)
                });
                res.status(400).json(eror)
            } else {
                res.status(500).json({message: 'internal server error'})
            }
        })
    }

    static patchTodo(req, res) {
        let { status } = req.body
        let id = +req.params.id

        Todo.update(req.body, {
            where: {id}
        })
        .then(todo => {
            if (todo[0] === 0) {
                res.status(404).json({message: 'error not found'})
            } else {
                res.status(200).json(req.body)
            }
        })
        .catch(err => {
            if (err.name === 'SequelizeValidationError') {
                let eror = []
                err.errors.forEach(e => {
                    eror.push(e.message)
                });
                res.status(400).json(eror)
            } else {
                res.status(500).json({message: 'internal server error'})
            }
        })
    }

    static deleteTodo(req, res) {
        let id = +req.params.id

        Todo.destroy({where: {id}})
        .then(todo => {
            if (todo === 0) {
                res.status(404).json({message: 'error not found'})
            } else {
                res.status(200).json({message: 'todo success to delete'})
            }
        })
        .catch(err => {
            res.status(500).json({message: 'internal server error'})
        })
    }
}

module.exports = TodoController
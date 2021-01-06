const { Todo } = require('../models')

module.exports = class TodoController {
    static getTodos(req, res, next) {
        Todo.findAll({
            attributes: {
                exclude: [ 'createdAt', 'updatedAt' ]
            }
        })
        .then( data => {
            return res.status(200).json(data)
        } )
        .catch( err => {
            next(err)
        } )
    }

    static getTodo(req, res, next) {
        Todo.findByPk(+req.params.id, {
            attributes: {
                exclude: [ 'UserId', 'createdAt', 'updatedAt' ]
            }
        })
        .then( data => {
            if (data) {
                return res.status(200).json(data)
            } else {
                next({ name: 'todoNotFound' })
            }
        } )
        .catch( err => {
            next(err)
        } )
    }

    static createTodo(req, res, next) {
        const newData = {
            title: req.body.title,
            description: req.body.description,
            status: req.body.status,
            due_date: req.body.due_date,
            UserId: req.user
        }
        Todo.create(newData)
        .then( data => {
            const response = {
                title: data.title,
                description: data.description,
                status: data.status,
                due_date: data.due_date
            }
            return res.status(201).json(response)
        } )
        .catch( err => {
            next(err)
        } )
    }

    static editTodo(req, res, next) {
        const getId = +req.params.id
        const newData = {
            title: req.body.title,
            description: req.body.description,
            status: req.body.status,
            due_date: req.body.due_date,
            UserId: req.user
        }
        Todo.update(newData, {
            where: {
                id: getId
            }
        })
        .then( data => {
            if (data[0] === 1) {
                return Todo.findByPk(getId, {
                    attributes: {
                        exclude: [ 'UserId', 'createdAt', 'updatedAt' ]
                    }
                })
            } else {
                next({ name: 'todoNotFound' })
            }
        } )
        .then( data => {
            return res.status(201).json(response)
        } )
        .catch( err => {
            next(err)
        } )
    }

    static patchTodo(req, res, next) {
        const newData = {
            status: req.body.status
        }
        Todo.update(newData, {
            where: {
                id: +req.params.id
            }
        })
        .then( data => {
            if (data[0] === 1) {
                return Todo.findByPk(+req.params.id, {
                    attributes: {
                        exclude: [ 'UserId', 'createdAt', 'updatedAt' ]
                    }
                })
            } else {
                next({ name: 'todoNotFound' })
            }
        } )
        .then( data => {
            return res.status(201).json(data)
        } )
        .catch( err => {
            next(err)
        } )
    }

    static removeTodo(req, res, next) {
        Todo.destroy( {
            where: {
                id: req.params.id
            }
        } )
        .then( data => {
            if (data === 1) {
                return res.status(200).json({ message: 'Todo has been deleted' })
            } else {
                next({ name: 'todoNotFound' })
            }
        } )
        .catch( err => {
            next(err)
        } )
    }
}
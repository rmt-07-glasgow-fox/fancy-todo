const { Todo } = require('../models')

class TodoController {
    static createTodo(req, res, next) {
        let obj = {
            title: req.body.title,
            description: req.body.description,
            due_date: req.body.due_date,
            UserId: req.user.id
        }

        Todo.create(obj)
        .then(data => {
            res.status(201).json(data)
        })
        .catch(next)
    }

    static listTodo(req, res, next) {
        Todo.findAll()
        .then(todos => {
            res.status(200).json(todos)
        })
        .catch(next)
    }

    static selectTodo(req, res, next) {
        let id = +req.params.id

        Todo.findByPk(id)
        .then(todo => {
            console.log(todo);
            if (!todo) {
                console.log(todo);
            } else {
                res.status(200).json(todo)
            }
        })
        .catch(next)
    }

    static updateTodo(req, res, next) {
        let updatedTodo = {
            title: req.body.title,
            description: req.body.description,
            status: req.body.status,
            due_date: req.body.due_date
        }
        let id = +req.params.id

        Todo.update(updatedTodo, {
            where: {id},
            returning: true
        })
        .then(todo => {
            res.status(200).json(todo[1][0])
        })
        .catch(next)
    }

    static patchTodo(req, res, next) {
        let id = +req.params.id

        Todo.update(req.body, {
            where: {id},
            returning: true
        })
        .then(todo => {
            res.status(200).json(todo[1][0])
        })
        .catch(next)
    }

    static deleteTodo(req, res, next) {
        let id = +req.params.id

        Todo.destroy({where: {id}})
        .then(todo => {
            res.status(200).json({message: 'todo success to delete'})
        })
        .catch(next)
    }
}

module.exports = TodoController
const { Todo } = require('../models')

class Controller {
    static create(req, res, next) {
        const { title, description, status, due_date } = req.body
        const UserId = req.userData.id
        Todo
            .create({ title, description, status, due_date, UserId })
            .then(newTodo => {
                const { id, title, description, status, due_date, UserId } = newTodo
                res.status(201).json({ id, title, description, status, due_date, UserId })
            })
            .catch(err => next(err))
    }

    static findAll(req, res, next) {
        Todo
            .findAll()
            .then(todoList => res.status(200).json(todoList))
            .catch(err => next(err))
    }

    static findByPk(req, res, next) {
        Todo
            .findByPk(+req.params.id)
            .then(todo => {
                todo ? res.status(200).json(todo) :
                next({ name: "NotFoundError" })
            })
            .catch(err => next(err))
    }

    static update(req, res, next) {
        const { title, description, status, due_date } = req.body
        Todo
            .update({ title, description, status, due_date },
                {
                    where: {id: +req.params.id},
                    returning: true,
                    plain:true
                })
            .then(todoEdited => {
                const { id, title, description, status, due_date } = todoEdited[1].dataValues
                res.status(200).json({ id, title, description, status, due_date })
            })
            .catch(err => next(err))
    }

    static updateStatus(req, res, next) {
        const { status } = req.body
        Todo
            .update({ status },
                {
                    where: {id: +req.params.id},
                    returning: true,
                    plain:true
                })
            .then(todoUpdated => {
                const { id, status } = todoUpdated[1].dataValues
                res.status(200).json({ id, status })
            })
            .catch(err => next(err))
    }

    static delete(req, res, next) {
        Todo
            .destroy({
                where : {id: +req.params.id},
                returning: true,
            })
            .then(data => {
                data ? res.status(200).json({
                    message: 'Todo success to be deleted!'
                }) :
                next({name: 'NotFoundError'})
            })
            .catch(err => next(err))
    }
}

module.exports = Controller
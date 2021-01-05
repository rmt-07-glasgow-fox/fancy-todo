const { Todo } = require('../models')

class Controller {
    static create(req, res) {
        const { title, description, status, due_date } = req.body
        const UserId = req.userData.id
        Todo
            .create({ title, description, status, due_date, UserId })
            .then(newTodo => {
                const { id, title, description, status, due_date, UserId } = newTodo
                res.status(201).json({ id, title, description, status, due_date, UserId })
            })
            .catch(err => {
                err.errors ?
                res.status(400).json({
                    message: err.message //.replace('Validation error: ','').replace('\nValidation error: ','\n')
                }) :
                res.status(500).json({
                    message: 'Internal Server Error' //err.message
                })
            })
    }

    static findAll(req, res) {
        Todo
            .findAll()
            .then(todoList => res.status(200).json(todoList))
            .catch(err => res.status(500).json({
                message: 'Internal Server Error'
            }))
    }

    static findByPk(req, res) {
        Todo
            .findByPk(+req.params.id)
            .then(todo => {
                todo ? res.status(200).json(todo) :
                res.status(404).json({
                    message: "Data Not Found"
                })
            })
            .catch(err => res.status(500).json({
                message: 'Internal Server Error'
            }))
    }

    static update(req, res) {
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
            .catch(err => {
                err.errors ?
                res.status(400).json({
                    message: err.message
                }) :
                err.parent ?
                res.status(500).json({
                    message: 'Internal Server Error' //err.message
                }) :
                res.status(404).json({
                    message: 'Data Not Found'
                })
            })
    }

    static updateStatus(req, res) {
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
            .catch(err => {
                err.errors ?
                res.status(400).json({
                    message: err.message
                }) :
                err.parent ?
                res.status(500).json({
                    message: 'Internal Server Error' //err.message
                }) :
                res.status(404).json({
                    message: 'Data Not Found'
                })
            })
    }

    static delete(req, res) {
        Todo
            .destroy({
                where : {id: +req.params.id},
                returning: true,
            })
            .then(data => {
                data ? res.status(200).json({
                    message: 'Todo success to be deleted!'
                }) :
                res.status(404).json({
                    message: 'Data Not Found'
                })
            })
            .catch(err => {
                res.status(500).json({
                    message: 'Internal Server Error'
                })
            })
    }
}

module.exports = Controller
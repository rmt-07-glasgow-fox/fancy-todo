const { Todo } = require('../models')

class Controller {
    static create(req, res) {
        const { title, description, status, due_date } = req.body
        Todo
            .create({ title, description, status, due_date })
            .then(newTodo => {
                res.status(201).json(newTodo)
            })
            .catch(err => {
                // let errors = (err.errors) && err.errors.map((error) => error.message);
                // let errMsg = {}
                // errors.forEach((el, i) => {
                //     !errMsg[`message${i}`] && (errMsg[`message${i}`] = '')
                //     errMsg[`message${i}`] = el
                // });
                err.errors ?
                res.status(400).json({
                    message: err.errors[0].message
                }) :
                res.status(500).json({
                    message: err.parent.routine
                })
            })
    }

    static findAll(req, res) {
        Todo
            .findAll()
            .then(todoList => res.status(200).json(todoList))
            .catch(err => res.status(500).json({
                message: err.parent.routine
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
                message: err.parent.routine
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
            .then(todoEdited => res.status(200).json(todoEdited[1].dataValues))
            .catch(err => {
                err.errors ?
                res.status(400).json({
                    message: err.errors[0].message
                }) :
                err.parent ?
                res.status(500).json({
                    message: err.parent.routine
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
            .then(todoUpdated => res.status(200).json(todoUpdated))
            .catch(err => {
                err.errors ?
                res.status(400).json({
                    message: err.errors[0].message
                }) :
                err.parent ?
                res.status(500).json({
                    message: err.parent.routine
                }) :
                res.status(404).json({
                    message: 'Data Not Found'
                })
            })
    }

    static delete(req, res) {
        Todo
            .destroy({
                where : {id: +req.params.id}
            })
            .then(data => res.status(200).json({
                message: 'Todo success to be deleted!'
            }))
            .catch(err => {
                err.parent ?
                res.status(500).json({
                    message: err.parent.routine
                }) :
                res.status(404).json({
                    message: 'Data Not Found'
                })
            })
    }
}

module.exports = Controller
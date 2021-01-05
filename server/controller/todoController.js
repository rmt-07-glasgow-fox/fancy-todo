const { TodoList } = require('../models')

class Controller {
    static create(req, res) {
        const create = {
            title : req.body.title,
            description : req.body.description,
            status : req.body.status,
            due_date : req.body.due_date
        }

        TodoList.create(create)
        .then(data => {
            res.status(201).json(data)
        })
        .catch(err => {
            if(err.errors) {
                res.status(400).json({
                    message : err.message
                })
            } else {
                res.status(500).json({
                    message : 'Error in internal server'
                })
            }
        })
    }

    static readList(req, res) {
        TodoList.findAll()
        .then(data => {
            res.status(200).json(data)
        })
        .catch(err => {
            res.status(500).json({
                message : 'Error in internal server'
            })
        })
    }

    static getTodoId(req, res) {
        let todoId = +req.params.id

        TodoList.findByPk(todoId)
        .then(data => {
            if(!data) {
                res.status(404).json({
                    message : 'Error not found'
                })
            } else {
                res.status(200).json(data)
            }
        })
        .catch(err => {
            res.status(500).json({
                message : 'Error in internal server'
            })
        })

    }

    static edit(req, res) {
        let todoId = +req.params.id

        let dataEdit = {
            title : req.body.title,
            description : req.body.description,
            status : req.body.status,
            due_date : req.body.due_date 
        }

        TodoList.update(dataEdit, {wheren : {
            id : todoId
        }})
        .then(data => {
            if(!data) {
                res.status(404).json({
                    message : 'Error not found'
                })
            } else {
                res.status(200).json(data)
            }
        })
        .catch(err => {
            res.status(500).json({
                message : 'Error in internal server'
            })
        })
    }

    static editStatus(req, res) {
        let todoId = +req.params.id

        let newStatus = {
            status : req.body.status
        }

        TodoList.update(newStatus, {where : 
            {id : todoId}
        })
        .then(data => {
            if(!data) {
                res.status(404).json({
                    message : 'Error not found'
                })
            } else {
                res.status(200).json(data)
            }
        })
        .catch(err => {
            res.status(500).json({
                message : 'Error in internal server'
            })
        })
    }

    static delete(req, res) {
        let todoId = +req.params.id

        TodoList.destroy({where : 
            {id : todoId}
        })
        .then(data => {
            if(!data) {
                res.status(404).json({
                    message : 'Error not found'
                })
            } else {
                res.status(200).json({
                    message : 'Todo success delete'
                })
            }
        })
        .catch(err => {
            res.status(500).json({
                message : 'Error in internal server'
            })
        })
    }
}

module.exports = Controller
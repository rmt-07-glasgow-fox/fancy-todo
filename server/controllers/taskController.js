const { Task } = require('../models')

class TaskController {
    static createTask(req, res) {
        const taskObj = {
            title: req.body.title, 
            description: req.body.description, 
            status: req.body.status, 
            due_date: new Date(req.body.due_date),
        }
        Task.create(taskObj)
            .then(data => {
                res.status(201).json(data)
            })
            .catch(err => {
                // res.send(err)
                if (err.name == 'SequelizeValidationError') {
                    res.status(400).json({
                        message: 'Validation Errors'
                    })
                } else {
                    res.status(500).json({
                        message: 'Internal Server Error'
                    })
                }
            })
    }

    static showTasks(req, res) {
        Task.findAll()
            .then(data => {
                res.status(200).json(data)
            })
            .catch(err => {
                res.status(500).json({
                    message: 'Internal Server Error'
                })
            })
    }

    static taskById(req, res) {
        let id = +req.params.id
        Task.findByPk(id)
            .then(data => {
                if (!data) {
                    res.status(404).json({
                        message: 'Not Found'
                    })
                } else {
                    res.status(200).json(data)
                }
            })
            .catch(err => {
                res.status(500).json({
                    message: 'Internal Server Error'
                })
            })
    }

    static updateTask(req, res) {
        let id = +req.params.id
        let updatedTask = {
            title: req.body.title,
            description: req.body.description,
            status: req.body.status,
            due_date: new Date(req.body.due_date)   
        }
        Task.findByPk(id)
            .then(data => {
                if (!data) {
                    res.status(404).json({
                        message: 'Not Found'
                    })
                } else {
                    return Task.update(updatedTask, {
                        where: { id },
                        returning: true 
                    })
                }
            })
            .then(data => {
                // console.log(data)
                res.status(200).json(data[1]) //yang ini gimana ya kak yang benar?
            })
            .catch(err => {
                if (err.name == 'SequelizeValidationError') {
                    res.status(400).json({
                        message: 'Validation Errors'
                    })
                } else {
                    res.status(500).json({
                        message: 'Internal Server Error'
                    })
                }
            })
    }

    static patchTask(req, res) {
        let id = +req.params.id
        let status = req.body.status
        Task.findOne({
            where: { id }
        })
            .then(data => {
                if (!data) {
                    res.status(404).json({
                        message: 'Not Found'
                    })
                } else {
                    let newStatus = status
                    return Task.update({
                        status: newStatus
                    }, {
                        where: { id },
                        returning: true 
                    })
                }
            })
            .then(data => {
                res.status(200).json(data[1])
            })
            .catch(err => {
                if (err.name == 'SequelizeValidationError') {
                    res.status(400).json({
                        message: 'Validation Errors'
                    })
                } else {
                    res.status(500).json({
                        message: 'Internal Server Error'
                    })
                }
            })
    }

    static deleteTask(req, res) {
        let id = +req.params.id
        Task.destroy({
            where: { id }
        })
            .then(result => {
                if (result == 0) {
                    res.status(404).json({
                        message: 'Not Found'
                    })
                } else {
                    res.status(200).json({
                        message: 'Task has been deleted'
                    })
                }
            })
            .catch(err => {
                res.status(500).json({
                    message: 'Internal Server Errors'
                })
            })
    }
}

module.exports = TaskController
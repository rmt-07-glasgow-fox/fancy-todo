const { Task } = require('../models')

class TaskController {
    static createTask(req, res, next) {
        const taskObj = {
            title: req.body.title, 
            description: req.body.description, 
            status: req.body.status, 
            due_date: new Date(req.body.due_date),
            UserId: req.user.id
        }
        Task.create(taskObj)
            .then(data => {
                res.status(201).json(data)
            })
            .catch(err => {
                // res.send(err)
                next(err)
            })
    }

    static showTasks(req, res, next) {
        Task.findAll()
            .then(data => {
                res.status(200).json(data)
            })
            .catch(err => {
                next(err)
            })
    }

    static taskById(req, res, next) {
        let id = +req.params.id
        Task.findByPk(id)
            .then(data => {
                if (!data) {
                    next({ name: 'Not Found' })
                } else {
                    res.status(200).json(data)
                }
            })
            .catch(err => {
                next(err)
            })
    }

    static updateTask(req, res, next) {
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
                    next({ name: 'Not Found' })
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
                next(err)
            })
    }

    static patchTask(req, res, next) {
        let id = +req.params.id
        let status = req.body.status
        Task.findOne({
            where: { id }
        })
            .then(data => {
                if (!data) {
                    next({ name: 'Not Found' })
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
                next(err)
            })
    }

    static deleteTask(req, res, next) {
        let id = +req.params.id
        Task.destroy({
            where: { id }
        })
            .then(result => {
                if (result == 0) {
                    next({ name: 'Not Found' })
                } else {
                    res.status(200).json({ message: 'Task has been deleted' })
                }
            })
            .catch(err => {
                next(err)
            })
    }
}

module.exports = TaskController
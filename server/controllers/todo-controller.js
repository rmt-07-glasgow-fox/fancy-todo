const { Todo } = require('../models')

class TodoController {
    static postTodoHandler(req, res, next) {
        // console.log(req.user)
        
        let obj = {
            title: req.body.title,
            description: req.body.description,
            status: req.body.status,
            due_date: req.body.due_date,
            UserId : req.user.id
        }
        // console.log(obj)
        Todo.create(obj)
            .then(data => {
                res.status(201).json(data)
            })
            .catch(err => {
                next(err)
            })
    }

    static getTodoHandler(req, res, next) {
        // console.log(new Date().toISOString())
        Todo.findAll({
            where: {
                UserId: req.user.id
            }, order: [['id', 'ASC']]
        })
            .then(data => {
                res.status(200).json(data)
            })
            .catch(err => {
                next(err)
            })
    }   

    static getTodoIdHandler(req, res, next) {
        let id = req.params.id

        Todo.findByPk(id)
            .then(data => {
                res.status(200).json(data)
            })
            .catch(err => {
                next(err)
            })
    }

    static putTodoIdHandler(req, res, next) {
        let id = req.params.id
        let { title, description, status, due_date } = req.body

        Todo.update({
            title,
            description,
            status,
            due_date
            }, {
            where: {
                id
            }, returning: true
        })
            .then(data => {
                if(data[0] === 0) {
                    next({name: "notFound"})
                } else {
                    res.status(200).json(data)
                }
            })
            .catch(err => {
                next(err)
            })
    }

    static patchTodoIdHandler(req, res, next) {
        let id = req.params.id
        let { status } = req.body

        Todo.update({
            status
        }, {
            where: {
                id
            }, returning: true
        })
            .then(data => {
                if(data[0] === 0) {
                    next({name: "notFound"})
                } else {
                    res.status(200).json(data)
                }
            })
            .catch(err => {
                next(err)
            })
    }

    static deleteTodoHandler(req, res, next) {
        let id = +req.params.id
        console.log(id)

        Todo.destroy({where: {
            id
        }})
            .then(data => {
                if(data === 0) {
                    next({name: "notFound"})
                } else {
                    res.status(200).json({message: 'todo success to delete'})
                }
            })
            .catch(err =>{
                next({name: 'error di delete'})
            })
    }
}

module.exports = TodoController
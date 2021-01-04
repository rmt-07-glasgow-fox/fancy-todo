const { Todo } = require('../models')

class todosController {

    static createTodo(req, res) {
        const newTodo = {
            title: req.body.title,
            description: req.body.description,
            status: req.body.status,
            due_date: req.body.due_date
        }

        Todo.create(newTodo)
            .then(data => {
                res.status(201).json(data)
            })
            .catch(err => {
                res.status(500).json(err)
            })

    }

    static getTodo(req, res) {
        Todo.findAll()
            .then(data => {
                res.status(200).json(data)
            })
            .catch(err => {
                res.status(500).json(err)
            })
    }

    static getTodoById(req, res) {
        Todo.findOne({
            where: {
                id: req.params.id
            }
        })
            .then(data => {
                res.status(200).json(data)
            })
            .catch(err => {
                res.status(404).jason({ message: "data not found" })
            })
    }

    static editTodo(req, res) {
        const dataTodo = {
            title: req.body.title,
            description: req.body.description,
            status: req.body.status,
            due_date: req.body.due_date
        }

        Todo.update(dataTodo, {
            where: {
                id: req.params.id
            }
        })
        .then(data => {
            res.status(200).json({message: "data updated!"})
        })
        .catch(err => {
            res.status(500).json(err)
        })
    }

    static changeStatus(req, res) {
        
    }

}


module.exports = todosController
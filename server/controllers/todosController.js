const {Todo} = require('../models')

class TodoController {
    static getTodos(req, res) {
        Todo.findAll()
            .then(todos => {
                res.status(200).json(todos)
            })
            .catch(err => {
                res.status(500).json({message: "Internal server error."})
            })
    }

    static postTodos(req, res) {
        const {title, description, due_date, status} = req.body

        Todo.create({
            title,
            description,
            due_date,
            status
        })
            .then(todo => {
                res.status(201).json(todo)
            })
            .catch(err => {
                err.errors.forEach(error => {
                    if (error.type === 'Validation error') {
                        res.status(400).json({message: error.message})
                    }
                    else {
                        res.status(500).json({message: "Internal server error."})
                    }
                })
            })
    }

    static getCurrentTodos(req, res) {
        const id = +req.params.id
        Todo.findByPk(id)
            .then(currentTodo => {
                if (!currentTodo) {
                    return res.status(404).json({message: "Error: todo not found."})
                }
                res.status(200).json(currentTodo)
            })
            .catch(err => {
                res.status(500).json({message: "Internal server error."})
            })
    }

    static putUpdateTodos(req, res) {
        const {title, description, status, due_date} = req.body
        Todo.findByPk(+req.params.id)
            .then(currentTodo => {
                return currentTodo.update({
                    title,
                    description,
                    status,
                    due_date
                })
            })
            .then(updatedTodo => {
                res.status(200).json(updatedTodo)
            })
            .catch(err => {
                if (err.errors) {
                    err.errors.forEach(error => {
                        if (error.type === 'Validation error') {
                            res.status(400).json({message: error.message})
                        }
                        else {
                            res.status(500).json({message: "Internal server error."})
                        }
                    })
                }
                else {
                    res.status(404).json({message: "Error: todo not found."})
                }
            })
    }
}

module.exports = TodoController




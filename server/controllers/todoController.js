const { Todo } = require('../models')

module.exports = class TodoController {
    static getTodo(req, res) {
        Todo.findAll({
            attributes: {
                exclude: [ 'createdAt', 'updatedAt' ]
            }
        })
        .then( data => {
            res.status(200).json(data)
        } )
        .catch( err => {
            res.status(500).json({ message: 'Internal server error' })
        } )
    }

    static createTodo(req, res) {
        const newData = {
            title: req.body.title,
            description: req.body.description,
            status: req.body.status,
            due_date: req.body.due_date
        }
        Todo.create(newData)
        .then( data => {
            res.status(201).json({ title: data.title, description: data.description, status: data.status, due_date: data.due_date })
        } )
        .catch( err => {
            res.status(500).json({ message: 'Internal server error' })
        } )
    }

    static removeTodo(req, res) {
        Todo.destroy( {
            where: {
                id: req.params.id
            }
        } )
        .then( data => {
            res.status(200).json({ message: 'Todo has been deleted' })
        } )
        .catch( err => {
            res.status(500).json({ message: 'Internal server error' })
        } )
    }
}
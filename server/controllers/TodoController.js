const { Todo } = require('../models');

class TodoController {
    static getTodos(req, res) {
        Todo.findAll({
            order: [['id', 'ASC']],
            attributes: {
                exclude: ['createdAt','updatedAt']
            }
        })
            .then(todos => res.status(200).json(todos))
            .catch(err => res.status(500).json({message: 'Internal server error'}))
    }

    static addTodo(req, res) {
        let newTodo = {
            title: req.body.title,
            description: req.body.description,
            status: "new todo",
            due_date: req.body.due_date
        }

        Todo.create(newTodo)
            .then(todo => res.status(201).json({
                id: todo.id,
                title: todo.title,
                description: todo.description,
                status: todo.status,
                due_date: todo.due_date
            }))
            .catch(err => {
                if (err.name === "SequelizeValidationError") {
                    res.status(400).json({message: 'Validation error'})
                } else {
                    res.status(500).json({message: "Internal server error"})
                }
            })
    }
   
    static getTodo(req, res) {
        let id = req.params.id;

        Todo.findOne({
            where: {id}, 
            attributes: {
                exclude: ['createdAt','updatedAt'],
            }
        })
            .then(todo => {
                if (todo) res.status(200).json(todo)
                else throw new Error('Error not found')
            })
            .catch(err => res.status(404).json({message: err.message}))
    }

    static editTodo(req, res) {
        let id = req.params.id;
        let editTodo = {
            title: req.body.title,
            description: req.body.description,
            status: req.body.status,
            due_date: req.body.due_date
        }
        
        Todo.update(editTodo, {
            where: {id},
            returning: true,
        })
            .then(data => {
                let success = data[0];
                let updatedTodo = data[1][0];

                if (!success) {
                    throw new Error ('IdNotFound')
                } else {
                    res.status(200).json({
                        id: updatedTodo.id,
                        title: updatedTodo.title,
                        description: updatedTodo.description,
                        status: updatedTodo.status,
                        due_date: updatedTodo.due_date
                    })
                } 
            })  
            .catch(err => {
                if (err.name === 'SequelizeValidationError') {
                    res.status(400).json({message: 'Validation error'})
                } else if (err.message === "IdNotFound") {
                    res.status(404).json({message: 'Error not found'})
                } else {
                    res.status(500).json({message: 'Internal server error'})
                }
            }) 
    }   

    static editStatusTodo(req, res) {
        let id = req.params.id;
        let editTodo = {
            status: req.body.status
        }

        Todo.update(editTodo, {
            where: {id},
            returning: true
        })
            .then(data => {
                let success = data[0];
                let updatedTodo = data[1][0];

                if (!success) {
                    throw new Error('IdNotFound')
                } else {
                    res.status(200).json({
                        id: updatedTodo.id,
                        title: updatedTodo.title,
                        description: updatedTodo.description,
                        status: updatedTodo.status,
                        due_date: updatedTodo.due_date
                    })
                }
            })
            .catch(err => {
                if (err.name === 'SequelizeValidationError') {
                    res.status(400).json({ message: 'Validation error' })
                } else if (err.message === "IdNotFound") {
                    res.status(404).json({ message: 'Error not found' })
                } else {
                    res.status(500).json({ message: 'Internal server error' })
                }
            }) 
    }

    static deleteTodo(req, res) {
        let id = req.params.id;
        let deletedTodo = '';

        Todo.findOne({
            where: {id},
            attributes: {
                exclude: ['createdAt','updatedAt']
            }
        })
            .then(todo => {
                deletedTodo = todo;
                return Todo.destroy({ where: { id } })
            })
            .then(success => {
                if (!success) {
                    throw new Error('IdNotFound');
                } else {
                    res.status(200).json({
                        message: 'Todo success to delete',
                        data: deletedTodo
                    })  
                }
            })
            .catch(err => {
                if (err.message === "IdNotFound") {
                    res.status(404).json({message: 'Error not found'})
                } else {
                    res.status(500).json({message: 'Internal server error'}) 
                }
            })
    }
}  
  
module.exports = TodoController 
const { Todo } = require('../models');

class Controller {
    static getTodos(req, res) {
        Todo.findAll({
            order: [['id', 'ASC']],
            attributes: {
                exclude: ['createdAt', 'updatedAt']
            }
        })
            .then(todos => {
                res.status(200).json(todos)
            })
            .catch(err => {
                console.log(err);
                res.status(500).json({message: 'internal server error'})
            })
    }

    static addTodo(req, res) {
        let newTodo = {
            title: req.body.title,
            description: req.body.description,
            status: req.body.status,
            due_date: req.body.due_date
        }

        Todo.create(newTodo)
            .then(todo => {
                res.status(201).json({
                    title: todo.title,
                    description: todo.description,
                    status: todo.status,
                    due_date: todo.due_date
                })
            })
            .catch(err => {
                if (err.name === "SequelizeValidationError") {
                    res.status(400).json({message: 'validation errors'})
                } else {
                    res.status(500).json({message: 'Internal server error'})
                }
            }) 
    }   

    static findTodo(req, res) {
        let id = req.params.id;

        Todo.findByPk(id, {
            attributes: {
                exclude: ["createdAt", "updatedAt"]
            }
        })
            .then(todo => {
                if (todo) {
                    res.status(201).json(todo)
                } else {
                    throw new Error('Error not found')
                }
            })
            .catch(err => {
                res.status(404).json({message: err.message})
            })
    }

    static editTodo(req, res) {
        let id = req.params.id;
        let editTodo = {
            title: req.body.title,
            description: req.body.description,
            status: req.body.status,
            due_date: req.body.due_date
        }

        Todo.findByPk(id) 
            .then(success => {
                if (success) {
                    return Todo.update(editTodo, {
                        where: { id },
                        returning: true,
                        plain: true,
                    })
                } else {
                    throw new Error('idNotFound')                    
                }
            })
            .then(updatedTodo => Todo.findOne({
                where: {id: updatedTodo[1].id},
                attributes: {
                    exclude: ['createdAt','updatedAt']
                }
            }))
            .then(updatedTodo => {
                res.status(200).json(updatedTodo)
            })
            .catch(err => {
                if (err.name === "SequelizeValidationError") {
                    res.status(400).json({message: 'validation error'})
                } else if (err.message === "idNotFound") {
                    res.status(404).json({message: 'error not found'})
                } else {
                    res.status(500).json({ message: 'Internal server error' })
                }
            })
    }

    static editStatus(req, res) {
        let id = req.params.id;
        let status = req.body.status;

        Todo.findByPk(id)
            .then(success => {
                if (success) {
                    return Todo.update({status}, {
                        where: { id },
                        returning: true,
                        plain: true,
                    })
                } else {
                    throw new Error('idNotFound')
                }
            })
            .then(updatedStatus => Todo.findOne({
                where: { id: updatedStatus[1].id },
                attributes: {
                    exclude: ['createdAt', 'updatedAt']
                }
            }))
            .then(updatedStatus => {
                res.status(200).json(updatedStatus)
            })
            .catch(err => {
                if (err.name === "SequelizeValidationError") {
                    res.status(400).json({ message: 'validation error' })
                } else if (err.message === "idNotFound") {
                    res.status(404).json({ message: 'error not found' })
                } else {
                    res.status(500).json({ message: 'Internal server error' })
                }
            })
    }

    static deleteTodo(req, res) {
        let id = req.params.id;

        Todo.destroy({where: {id}})
            .then(succes => {
                if (succes) {
                    res.status(200).json({message: 'todo success to delete'});
                } else {
                    res.status(404).json({message: 'error not found'})
                }
            })
            .catch(err => {
                res.status(500).json({message: 'internal server error'})
            })
    }
}

module.exports = Controller;
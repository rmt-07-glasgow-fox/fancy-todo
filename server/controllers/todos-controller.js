const { Todo } = require('../models');

class TodoController {
    static todosGet = (req, res) => {
        Todo.findAll({attributes: {exclude: ['createdAt', 'updatedAt']}})
        .then(output => res.status(200).json(output))
        .catch(err => res.status(500).json({message: 'internal server error'}))
    }
    static todosPost = (req, res) => {
        const {title, description, due_date } = req.body;
        Todo.create({title, description, due_date})
        .then(output => res.status(200).json(output))
        .catch(err => {
            if (err.name === 'SequelizeValidationError') {
                res.status(400).json(err.errors);
            } else {
                res.status(500).json({message: 'internal server error'});
            }
        });
    }
    static todoGet = (req, res) => {
        Todo.findByPk(req.params.id, {attributes: {exclude: ['createdAt', 'updatedAt']}})
        .then(output => {
            if (output) {
                res.status(200).json(output)
            } else {
                throw {message: 'not found'}
            }
        })
        .catch(err => res.status(404).json(err));
    }
    static todoPut = (req, res) => {
        const { title, description, due_date} = req.body;
        Todo.update({title, description, due_date}, {where: {id: req.params.id}})
        .then(output => res.status(200).json(output))
        .catch(err => {
            if (err.name === 'SequelizeValidationError') {
                res.status(400).json(err);
            } else {
                res.status(500).json({message: 'internal server error'});
            }
        });
    }
    static todoPatch = (req, res) => {
        Todo.update({status: req.body.status}, {where: {id: req.params.id}})
        .then(output => {
            if (output) {
                res.status(200).json(output)
            } else {
                throw {message: 'not found'}
            }
        })
        .catch(err => {
            if (err.name === 'SequelizeValidationError') {
                res.status(400).json(err)
            } else {
                res.status(500).json({message: 'internal server error'})
            }
        })
    }
    static todoDelete = (req, res) => {
        Todo.destroy()
    }
}

module.exports = TodoController;
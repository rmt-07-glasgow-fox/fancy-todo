const {Todos} = require('../models')
class TodosController{
    static showTodos (req, res) {
        Todos.findAll()
        .then(result => {
            return res.status(200).json(result);
        })
        .catch(err => {
            return res.status(500).json(err.message);
        })
    }
    static saveTodos(req, res) {
        const {title, description, status, due_date} = req.body
        Todos.create({title, description, status, due_date})
        .then(data => {
            return res.status(201).json(data);
        })
        .catch(err => {
            return res.status(401).json(err.message);
        })
    }
    static deleteTodos(req, res) {

    }
    static showTodosById(req, res) {

    }
}

module.exports = TodosController
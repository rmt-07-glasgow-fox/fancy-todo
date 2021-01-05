const {Todo} = require("../models")

class todoController {
    static createTodo(req,res) {
        const {title, description, status, due_date} = req.body
        let data = {title, description, status, due_date }
        Todo.create(data)
        .then(todo => {
            console.log("then")
            return res.status(201).json(todo)})
        .catch(err => {
            if (err.name === 'SequelizeValidationError') {
                return res.status(400).json({message: "Due date must be later than today"})
            } 
            return res.status(500).json({message: "internal server error"})})
    }

    static showTodos(req, res) {
        Todo.findAll()
        .then(todos => res.status(200).json(todos))
        .catch(err => res.status(500).json({message: "internal server error"}))
    }

    static showTodo(req, res) {
        Todo.findByPk(+req.params.id)
        .then(todo => {
            if (todo) {
                res.status(200).json(todo) 
            } else {
                res.status(404).json({message: "not found"})
            }})
        .catch(err => res.status(500).json({message: "internal server error"}))
    }

    static updateTodo(req, res) {
        let data = {title, description, due_date}
        Todo.update(data, {where: {id: +req.params.id}})
        .then(data => {
            return Todo.findByPk(+req.params.id)})
        .then(todo => {
                if (todo) {
                    res.status(200).json(todo) 
                } else {
                    res.status(404).json({message: "not found"})
                }})
        .catch(err => {
            if (err.name === 'SequelizeValidationError') {
                return res.status(400).json({message: "Due date must be later than today"})
            } 
            return res.status(500).json({message: "internal server error"})})
    }

    static updateStatusTodo (req, res) {
        let data = {
            status: req.body.status
        }
        Todo.update(data, {where: {id: +req.params.id}})
        .then(data => {
            return Todo.findByPk(+req.params.id)})
        .then(todo => {
            if (todo) {
                res.status(200).json(todo) 
            } else {
                res.status(404).json({message: "not found"})
            }})
        .catch(err => {
            return res.status(500).json({message: "internal server error"})})
    }

    static deleteTodo(req, res) {
        Todo.destroy({where: {id: +req.params.id}})
        .then(todo => {
            if (todo) {
                res.status(200).json({message: "todo success to delete"}) 
            } else {
                res.status(404).json({message: "not found"})
            }})
        .catch(err => res.status(500).json({message: "internal server error"}))
    }
}

module.exports = todoController
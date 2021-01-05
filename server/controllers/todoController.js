const {Todo} = require("../models")

class todoController {
    static createTodo(req,res) {
        let data = {
            title: req.body.title,
            description: req.body.description,
            due_date: req.body.due_date
        }
        if (new Date(req.body.due_date).getTime() < new Date().getTime()) {
            return res.status(400).json({message: "Due date must be later than today"})
        }
        Todo.create(data)
        .then(data => {
            console.log("then")
            return res.status(201).json(data)})
        .catch(err => {
            console.log("catch")
            return res.status(500).json({message: err.message})})
    }

    static showTodos(req, res) {
        Todo.findAll()
        .then(data => res.status(200).json(data))
        .catch(err => res.status(500).json({message: err.message}))
    }

    static showTodo(req, res) {
        Todo.findByPk(+req.params.id)
        .then(data => {
            if (data) {
                res.status(200).json(data) 
            } else {
                res.status(404).json({error: "not found"})
            }})
        .catch(err => res.status(500).json({message: err.message}))
    }

    static updateTodo(req, res) {
        let data = {
            title: req.body.title,
            description: req.body.description,
            due_date: req.body.due_date
        }
        if (new Date(req.body.due_date).getTime() < new Date().getTime()) {
            return res.status(400).json({message: "Due date must be later than today"})
        }
        Todo.update(data, {where: {id: +req.params.id}})
        .then(data => {
            console.log("then")
            return Todo.findByPk(+req.params.id)})
        .then(data => res.status(201).json(data))
        .catch(err => {
            return res.status(500).json({message: err.message})})
    }

    static updateStatusTodo (req, res) {
        let data = {
            status: req.body.status
        }
        Todo.update(data, {where: {id: +req.params.id}})
        .then(data => {
            console.log("then")
            return Todo.findByPk(+req.params.id)})
        .then(data => res.status(201).json(data))
        .catch(err => {
            return res.status(500).json({message: err.message})})
    }

    static deleteTodo(req, res) {
        Todo.destroy({where: {id: +req.params.id}})
        .then(data => res.status(200).json({message: "todo success to delete"}))
        .catch(err => res.status(500).json({message: err.message}))
    }
}

module.exports = todoController
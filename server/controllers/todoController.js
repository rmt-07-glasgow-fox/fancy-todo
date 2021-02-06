const {Todo} = require("../models")

class todoController {
    static createTodo(req,res, next) {
        const {title, description, status, due_date} = req.body
        let UserId = req.user.id
        let data = {title, description, status, due_date, UserId}
        Todo.create(data)
        .then(todo => {
            return res.status(201).json(todo)})
        .catch(err => {
            next(err)
        })
    }

    static showTodos(req, res, next) {
        Todo.findAll({order: [['due_date', 'ASC']]})
        .then(todos => res.status(200).json(todos))
        .catch(err => next(err))
    }

    static showTodo(req, res, next) {
        Todo.findByPk(+req.params.id)
        .then(todo => {
            if (todo) {
                res.status(200).json(todo) 
            } else {
                next({name: "notFound"})
            }})
        .catch(err => next(err))
    }

    static updateTodo(req, res) {
        const {title, description, due_date} = req.body
        let data = {title, description, due_date}
        Todo.update(data, {where: {id: +req.params.id}})
        .then(data => {
            return Todo.findByPk(+req.params.id)})
        .then(todo => {
                if (todo) {
                    res.status(200).json(todo) 
                } else {
                    next({name: "notFound"})
                }})
        .catch(err => {
            next(err)
        })
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
                next({name: "notFound"})
            }})
        .catch(err => {
            next(err)
        })
    }

    static deleteTodo(req, res) {
        Todo.destroy({where: {id: +req.params.id}})
        .then(todo => {
            if (todo) {
                res.status(200).json({message: "todo success to delete"}) 
            } else {
                next({name: "notFound"})
            }})
        .catch(err => next(err))
    }
}

module.exports = todoController
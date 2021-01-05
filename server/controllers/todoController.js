const { Todo } = require('../models')
const todo = require('../models/todo')

class TodoController {
    static async fetch(req, res, next) {
        try {
            const todoList = await Todo.findAll({
                where: {
                    UserId: req.loggedInUser.id
                },
                order: [['status', 'DESC']]
            })
            if(todoList) {
                res.status(200).json(todoList)
            }
            else {
                throw {
                    status: 404,
                    message: 'Todo not found'
                }
            }
        }
        catch(error) {
            next(error)
        }
    }

    static async add(req, res, next) {
        try {
            const newTodo = {
                title: req.body.title,
                description: req.body.description,
                status: req.body.status,
                due_date: new Date(req.body.due_date),
                UserId: req.loggedInUser.id
            }
            const createTodo = await Todo.create(newTodo)
            res.status(201).json(createTodo)
        }
        catch(error) {
            next(error)
        }

    }

    static async fetchById(req, res, next) {
        try {
            const todoId = req.params.id
            const todo = await Todo.findOne({
                where: {
                    id: todoId
                }
            })
            if(todo == null) {
                throw {
                    status: 404,
                    message: 'Todo not found'
                }
            }
            res.status(200).json(todo)
        }
        catch(error) {
            next(error)
        }

    }

    static async updateDoneById(req, res, next) {
        try {
            const todoId = req.params.id
            const update = await Todo.findOne({
                where: {
                    id: todoId
                }
            })
            if(update == 0) {
                throw {
                    status: 404,
                    message: 'Todo not found'
                }
            }
            const updated = {
                title: update.title,
                description: update.description,
                status: 'sudah',
                due_date: update.due_date,
                UserId: update.UserId
            }
            const updateTodo = await Todo.update(updated, {
                where: {
                    id: todoId
                }
            })
            if(updateTodo) {
                res.status(200).json(updateTodo, 'Updated successfully!')
            }
            else {
                throw {
                    status: 404,
                    message: 'Todo not found'
                }
            }
        }
        catch(error) {
            next(error)
        }
    }

    static async deleteById(req, res, next) {
        
    }
}

module.exports = TodoController
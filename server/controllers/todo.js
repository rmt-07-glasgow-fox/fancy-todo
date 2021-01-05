const {Todo} = require('../models')

class ControllerTodo {
    static readTodo(req, res){
        Todo.findAll()
        .then(data => {
            res.status(200).json({data})
        })
        .catch(err => {
            res.status(404).json({
                message: "Invalid request"
            })
        })
    }
    static createTodo(req, res){
        const {title, description, due_date} = req.body
        Todo.create({title, description, status: true, due_date: new Date(due_date), user_id:req.user_id, createdAt: new Date(), updatedAt: new Date()})
        .then(data => {
            res.status(200).json({data})
        })
        .catch(err => {
            console.log(err)
            res.status(404).json({
                message: "Invalid request"
            })
        })
    }
    static updateTodo(req, res){
        const {title, description, status, due_date} = req.body
        Todo.update({title, description, status, due_date}, {
            where: {
                id: +req.params.id
            }
        })
        .then(data => {
            console.log(data)
            res.status(200).json({
                message: "Data updated"
            })
        })
        .catch(err => {
            res.status(404).json({
                message: "Invalid request"
            })
        })
    }
    static deleteTodo(req, res){
        Todo.destroy({
            where: {
                id: +req.params.id
            }
        })
        .then(data => {
            console.log(data)
            res.status(200).json({
                message: "One To-do is deleted"
            })
        })
        .catch(err => {
            res.status(404).json({
                message: "Invalid request"
            })
        })
    }
}

module.exports = ControllerTodo
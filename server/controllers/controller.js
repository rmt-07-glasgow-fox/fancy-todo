const {Todo} = require('../models')

class Controller{
    static getTodo(req, res){
        Todo.findAll()
        .then(data => {
            res.status(200).json(data)
        })
        .catch(err => {
            res.status(500)
        })
    }

    static createTodo(req, res){
        const todo = {
            title : req.body.title,
            description : req.body.description,
            status : req.body.status,
            due_date : req.body.due_date
        }
        Todo.create(todo)
        .then(data => {
            res.status(201).json(data)
        })
        .catch(err => {
            if(err.errors){
                let message = []
                err.errors.forEach(el => {
                    message.push(el.message)
                })
                res.status(400).json({
                    Errors : message
                })
            } else {
                res.status(500)
            }
        })
    }

    static findTodoById(req, res){
        let todoID = +req.params.id
        Todo.findOne({
            where : {
                id : todoID
            }
        })
        .then(data => {
            if(data){
                res.status(200).json(data)
            } else {
                res.status(404).json({message: 'Cannot find ID'})
            } 
        })
        .catch(err => {
            res.status(500).json({message: 'Internal Server Error'})
        })
    }

    static editTodo(req, res){
        let todoID = +req.params.id
        const newTodo = {
            title: req.body.title,
            description: req.body.description,
            status: req.body.status,
            due_date: req.body.due_date
        }
        Todo.update(newTodo,{
            where : {
                id : todoID
            }
        })
        .then(data => {
            console.log(data)
            if(data[0] === 1){
                return Todo.findOne({
                    where : {
                        id : todoID
                    }
                })
            } else if (data[0] === 0) {
                const errorMessage = {
                    message : 'error not found'
                }
                res.status(404).send(errorMessage)
            }
        })
        .then(editedTodo => {
            res.status(200).json(editedTodo)
        })
        .catch(err => {
            res.status(500)
        })
    }

    static editStatusTodo(req, res){
        const todoID = +req.params.id
        const edit = {
            status : req.body.status
        }
        Todo.update(edit, {
            where : {
                id : todoID
            }
        })
        .then(data => {
            if(data[0] === 1){
                return Todo.findOne({
                    where : {
                        id : todoID
                    }
                })
            } else {
                const errorMessage = {
                    message : 'error not found'
                }
                res.status(404).send(errorMessage)
            }
        })
        .then(updatedData => {
            res.status(200).json(updatedData)
        })
        .catch(err => {
            if(err){
                res.status(400).send(err)
            }
        })
    }


    static deleteTodoById(req, res){
        let todoID = +req.params.id
        Todo.destroy({
            where : {
                id : todoID
            }
        })
        .then(data => {
            if(data === 1){
                res.status(200).json({message: 'todo success to delete'})
            } else {
                const errorMessage = {
                    message : 'error not found'
                }
                res.status(404).send(errorMessage)
            }
        })
        .catch(err => {
            res.status(500).json({message: 'Internal Server Error'})
        })
    }
}

module.exports = Controller
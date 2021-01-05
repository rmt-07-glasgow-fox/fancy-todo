const {Todo} = require('../models')

class todoController{
    static getTodo(req, res, next){
        Todo.findAll({
            where: {
                userId : req.user.id
            }
        })
        .then(data => {
            if(data.length !== 0){
                res.status(200).json(data)
            } else {
                next ({name : "Not found"})
            }
        })
        .catch(err => {
            next(err)
        })
    }

    static createTodo(req, res, next){
        const todo = {
            title : req.body.title,
            description : req.body.description,
            status : req.body.status,
            due_date : req.body.due_date,
            userId : req.user.id
        }
        Todo.create(todo)
        .then(data => {
            res.status(201).json(data)
        })
        .catch(err => {
            next(err)
        })
    }

    static findTodoById(req, res, next){
        let todoID = +req.params.id
        Todo.findOne({
            where : {
                userId : req.user.id,
                id : todoID
            }
        })
        .then(data => {
            res.status(200).json(data)
        })
        .catch(err => {
            next(err)
        })
    }

    static editTodo(req, res, next){
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
            }
        })
        .then(editedTodo => {
            res.status(200).json(editedTodo)
        })
        .catch(err => {
            next(err)
        })
    }

    static editStatusTodo(req, res, next){
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
            } 
        })
        .then(updatedData => {
            res.status(200).json(updatedData)
        })
        .catch(err => {
            next(err)
        })
    }


    static deleteTodoById(req, res, next){
        let todoID = +req.params.id
        Todo.destroy({
            where : {
                id : todoID
            }
        })
        .then(data => {
            if(data === 1){
                res.status(200).json({message: 'todo success to delete'})
            }
        })
        .catch(err => {
            next(err)
        })
    }
}

module.exports = todoController
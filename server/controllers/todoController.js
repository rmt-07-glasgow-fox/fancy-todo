const {Todo} = require('../models')
const { sendEmail } = require('../helpers/mailgun')


class todoController{
    static getTodo(req, res, next){
        Todo.findAll({
            where: {
                userId : req.user.id
            },
            order : ['id']
        })
        .then(data => {
            if(data.length !== 0){
                res.status(200).json(data)
            } else {
                res.status(200).json({message : 'No Todo'})
            }
        })
        .catch(err => {
            console.log(err)
            next(err)
        })
    }

    static createTodo(req, res, next){
        let userEmail = req.user.email
        const todo = {
            title : req.body.title,
            description : req.body.description,
            status : req.body.status,
            due_date : req.body.due_date,
            userId : req.user.id
        }
        Todo.create(todo)
        .then(data => {
            let todoObj = {
                title : data.title,
                description : data.description,
                due_date : data.due_date.toISOString().substring(0,10)
            }
            sendEmail(userEmail, todoObj)
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
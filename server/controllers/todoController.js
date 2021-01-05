const {Todo} = require('../models')

class TodoController{
    static getTodos(req, res, next){
        Todo.findAll()
        .then(data => {
            res.status(200).json(data)
        })
        .catch(() => {
            next({status: 500})
        })
    }

    static addTodo(req, res, next){
        const value = {
            title: req.body.title,
            description: req.body.description,
            status: req.body.status,
            due_date: req.body.due_date,
            UserId: req.userData.id
        }
        Todo.create(value)
        .then(data => {
            res.status(201).json(data)
        })
        .catch(err => {
            if(err.name === "SequelizeValidationError"){
                next({
                    status: 400,
                    errors: err.errors
                })
            } else {
                next({status: 500})
            }
        })
    }

    static getTodoId(req, res, next){
        const id = req.params.id
        Todo.findByPk(id)
        .then(data => {
            if(data){
                res.status(200).json(data)
            } else {
                next({status: 404})
            }           
        })
        .catch(() => {
            next({status: 500})
        })
    }

    static putTodo(req, res, next){
        const id = req.params.id
        const value = {
            title: req.body.title,
            description: req.body.description,
            status: req.body.status,
            due_date: req.body.due_date
        }
        Todo.update(value,{
            where: { id },
            returning: true
        })
        .then(data => {
            if(data[0]){
                let result = data[1][0].dataValues
                res.status(200).json(result)
            } 
            else next({status: 404})
        })
        .catch(err => {
            console.log(err);
            if(err.name === "SequelizeValidationError"){
                next({
                    status: 400,
                    errors: err.errors
                })
            } else {
                next({status: 500})
            }
        })
    }

    static patchTodo(req, res, next){
        const id = req.params.id
        const value = {
            status: req.body.status
        }
        Todo.update(value, {
            where: { id },
            returning: true
        })
        .then(data => {
            if(data[0]){
                let result = data[1][0].dataValues
                res.status(200).json(result)
            } 
            else next({status: 404})
        })
        .catch(err => {
            if (err.name === "SequelizeValidationError"){
                next({
                    status: 400,
                    errors: err.errors
                })
            } else {
                next({status: 500})
            }
        })
    }

    static deleteTodo(req, res, next){
        const id = req.params.id
        Todo.destroy({where:{id}})
        .then(data => {
            if(data) res.status(200).json({message: "Todo success to deleted"})
            else next({status: 404})
        })
        .catch(() => {
            next({status: 500})
        })
    }
}

module.exports = TodoController
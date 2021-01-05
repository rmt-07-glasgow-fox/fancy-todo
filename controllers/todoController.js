const {Todo} = require('../models')

class todoController{
    static postTodo(req,res,next){
        const todoObj = {
            "title": req.body.title,
            "description": req.body.description,
            "status": req.body.status,
            "due_date": req.body.due_date,
            "UserId": req.user.id
        }
        Todo.create(todoObj)
        .then(data=>{
            res.status(201).json(data)
        })
        .catch(err=>{
            next(err)
        })
    }

    static getTodos(req,res,next){
        Todo.findAll({where:{UserId:req.user.id}})
        .then(data=>{
            res.status(200).json(data)
        })
        .catch(err=>{
            next(err)
        })
    }

    static getTodosById(req,res,next){
        const id = req.params.id
        Todo.findByPk(id)
        .then(data=>{
            res.status(200).json(data)
        })
        .catch(err=>{
            next(err)
        })
    }

    static putTodo(req,res,next){
        const id = req.params.id
        const todoObj = {
            "title": req.body.title,
            "description": req.body.description,
            "status": req.body.status,
            "due_date": req.body.due_date
        }
        Todo.update(todoObj,{where:{id: id}})
        .then(data=>{
            if (data[0]==1) {
                return Todo.findByPk(id)
            } else {
                next({name: 'notFound'})
            }
        })
        .then(todo=>{
            res.status(200).json(todo)
        })
        .catch(err=>{
            next(err)
        })
    }

    static patchTodo(req,res,next){
        const id = req.params.id
        const todoObj = {
            "status": req.body.status
        }
        Todo.update(todoObj,{where:{id: id}})
        .then(data=>{
            if (data[0]==1) {
                return Todo.findByPk(id)
            } else {
                next({name: 'notFound'})
            }
        })
        .then(todo=>{
            res.status(200).json(todo)
        })
        .catch(err=>{
            next(err)
        })
    }

    static deleteTodo(req,res,next){
        const id = req.params.id
        Todo.destroy({where:{id: id}})
        .then(data=>{
            if (data==1) {
                res.status(200).json({message: 'todo success to delete'})
            } else {
                next({name: 'notFound'})
            }
        })
        .catch(err=>{
            next(err)
        })
    }
}

module.exports = todoController
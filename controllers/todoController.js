const {Todo,User,UserTodo} = require('../models')
const decode = require('../helper/webToken')

class todoController{
    static postTodo(req,res,next){
        let lastTodo
        const todoObj = {
            "title": req.body.title,
            "description": req.body.description,
            "status": req.body.status,
            "due_date": req.body.due_date
        }
        Todo.create(todoObj)
        .then(data=>{
            lastTodo = data
            return Todo.findOne({order: [ [ 'createdAt', 'DESC' ]]})
        })
        .then(data=>{
            let UserId = decode.decodeToken(req.headers.accesstoken).id
            let TodoId = data.id
            return UserTodo.create({UserId,TodoId})
        })
        .then(()=>{
            res.status(201).json(lastTodo)
        })
        .catch(err=>{
            next(err)
        })
    }

    static getTodos(req,res,next){
        let UserId = decode.decodeToken(req.headers.accesstoken).id
        Todo.findAll({include:{model:User,where:{id:UserId}}})
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
        let status = req.body.status
        Todo.update({status},{where:{id: id}})
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
                return UserTodo.destroy({where:{TodoId: id}})
            } else {
                next({name: 'notFound'})
            }
        })
        .then(()=>{
            res.status(200).json({message: 'todo success to delete'})
        })
        .catch(err=>{
            next(err)
        })
    }
}

module.exports = todoController
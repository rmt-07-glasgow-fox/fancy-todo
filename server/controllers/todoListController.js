const {TodoList} = require('../models/index')

class Controller{
    static newTodos(req, res, next){
        let body = req.body
        let userId = req.user.id
        let data = {
            title: body.title,
            description: body.description,
            status: body.status,
            due_date: body.due_date,
            UserId: userId
        }
        TodoList.create(data)
        .then(data=>{
            res.status(201).json(data)
        })
        .catch(err=>{
            next(err)
            console.log(err)
        })
    }

    static allTodos(req, res, next){
        let UserId = req.user.id
        TodoList.findAll({where:{UserId}})
        .then(data=>{
            res.status(200).json(data)
        })
        .catch(err=>{
            next(err)
        })
    }

    static findTodoById(req, res){
        let id = req.params.id
        TodoList.findByPk(id)
        .then(data=>{
            res.status(200).json(data)
        })
        .catch(err=>{
            next(err)
        })
    }

    static updateTodo(req, res, next){
        let id = req.params.id
        let body = req.body
        let dataUser = {
            title: body.title,
            description: body.description,
            status: body.status,
            due_date: body.due_date,
            UserId:req.user.id
        }
        TodoList.update(dataUser,{where:{id}})
        .then(data=>{
            res.status(200).json({message: 'Data Updated', data:dataUser})
        })
        .catch(err=>{
            next(err)
            console.log(err)
        })
    }

    static editStatusTodo(req, res){
        let id = req.params.id
        let status = {status:req.body.status}
        TodoList.update(status,{where:{id}})
        .then(data=>{
            res.status(200).json({message: 'Data Updated'})
        })
        .catch(err=>{
            next(err)
            console.log(err)
        })
    }
    
    static deleteTodo(req, res){
        let id = req.params.id
        TodoList.destroy({where:{id}})
        .then(data=>{
            res.status(200).json({message:"Todo has been delete"})
        })
        .catch(err=>{
            next(err)
        })
    }
}
module.exports = Controller
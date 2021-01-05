const {TodoList} = require('../models/index')

class Controller{
    static newTodos(req, res){
        let body = req.body
        let data = {
            title: body.title,
            description: body.description,
            status: body.status,
            due_date: body.due_date
        }
        TodoList.create(data)
        .then(data=>{
            res.status(201).json(data)
        })
        .catch(err=>{
            res.status(500).json({message:err})
            console.log(err)
        })
    }
    static allTodos(req, res){
        TodoList.findAll()
        .then(data=>{
            res.status(200).json(data)
        })
        .catch(err=>{
            res.status(500).json({message: err})
        })
    }
    static findTodoById(req, res){
        let id = req.params.id
        TodoList.findByPk(id)
        .then(data=>{
            if(data === null){
                return res.status(404).json({message:'id not found'})
            }
            res.status(200).json(data)
        })
        .catch(err=>{
            res.status(500).json({message:err})
        })
    }
    static updateTodo(req, res){
        let id = req.params.id
        let body = req.body
        let data = {
            title: body.title,
            description: body.description,
            status: body.status,
            due_date: body.due_date
        }
        TodoList.update(data,{where:{id}})
        .then(data=>{
            if(data[0] === 0){
                return res.status(404).json({message:'id not found'})
            }
            res.status(200).json({message: 'Data Updated'})
        })
        .catch(err=>{
            res.status(500).json({message:err})
            console.log(err)
        })
    }
    static editStatusTodo(req, res){
        let id = req.params.id
        let status = {status:req.body.status}
        TodoList.update(status,{where:{id}})
        .then(data=>{
            if(data[0] === 0){
                return res.status(404).json({message:'id not found'})
            }
            res.status(200).json({message: 'Data Updated'})
        })
        .catch(err=>{
            res.status(500).json({message:err})
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
            res.status(500).json({message:err})
        })
    }
}
module.exports = Controller
const e = require('express')
const {Todo} = require('../models')

class TodoController {
    static todoPage (req, res){
        // res.send('hello world')
        Todo.findAll()
        .then(data => {
            res.status(200).json(data)
        })
        .catch(err => {
            res.status(500).json({message:'internal server error'})
        })
    }

    static todoByid (req, res) {
        Todo.findOne({
            where:{id: req.params.id}
        })
        .then(data => {
            res.status(200).json(data)
        })
        .catch(err => {
            res.status(404).json({message:'data not found'})
        })
    }

    static createTodo (req,res){
        const todoObj = {
            title : req.body.title,
            description: req.body.description,
            status: req.body.status,
            due_date: req.body.due_date,
            user_id: req.user.id
        }
        Todo.create(todoObj)
        .then(data => {
            res.status(201).json(data)
        })
        .catch(err => {
            res.status(500).json({message:'internal server error'})
        })
    }
    
    static updateTodo (req,res) {
        let todoObj = {
            title : req.body.title,
            description: req.body.description,
            status: req.body.status,
            due_date: req.body.due_date
        }
        Todo.update(todoObj,{
            where:{id:req.params.id}
        })
        .then(data =>{
            res.status(200).json(data)
        })
        .catch(err =>{
            res.status(500).json({message:'internal server error'})
        })
    }

    static statusChange(req,res) {
        let todoObj = {
            status : req.body.status
        }
        Todo.update(todoObj,{where:{id:req.params.id}})
        .then(data =>{
            res.status(200).json(data)
        })
        .catch(err =>{
            res.status(404).json({message:'data not found'})
        })
    }

    static deleteTodo (req, res) {
        Todo.destroy({where:{id:req.params.id}})
        .then(data => {
            if(data == 1) {
                res.status(200).json({message: 'data deleted sucessfully'})
            } else {
                throw {
                    message : 'data not found'
                }
            }
        })
        .catch(err => {
            res.status(404).json(err)
        })

    }
}

module.exports = TodoController
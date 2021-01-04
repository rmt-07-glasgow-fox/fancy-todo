const {Todo} = require('../models')

class todoController{
    static postTodo(req,res){
        const todoObj = {
            "title": req.body.title,
            "description": req.body.description,
            "status": req.body.status,
            "due_date": req.body.due_date
        }
        Todo.create(todoObj)
        .then(data=>{
            res.status(200).json(data)
        })
        .catch(err=>{
            if (err.name == 'SequelizeValidationError') {
                let errors = []
                err.errors.forEach(e=>{
                    errors.push(e.message)
                })
                res.status(400).json(errors)
            } else {
                res.status(500).json(err)
            }
        })
    }

    static getTodos(req,res){
        Todo.findAll()
        .then(data=>{
            res.status(200).json(data)
        })
        .catch(err=>{
            res.status(500).json(err)
        })
    }

    static getTodosById(req,res){
        const id = req.params.id
        Todo.findByPk(id)
        .then(data=>{
            if (data) {
                res.status(200).json(data)
            } else {
                res.status(404).json({msg: 'error not found'})
            }
        })
        .catch(err=>{
            res.status(500).json(err)
        })
    }

    static putTodo(req,res){
        const id = req.params.id
        const todoObj = {
            "title": req.body.title,
            "description": req.body.description,
            "status": req.body.status,
            "due_date": req.body.due_date
        }
        Todo.update(todoObj,{where:{id: id}})
        .then(data=>{
            console.log(data[0]);
            if (data[0]==1) {
                res.status(200).json(todoObj)
            } else {
                res.status(404).json({msg: 'error not found'})
            }
        })
        .catch(err=>{
            if (err.name == 'SequelizeValidationError') {
                let errors = []
                err.errors.forEach(e=>{
                    errors.push(e.message)
                })
                res.status(400).json(errors)
            } else {
                res.status(500).json(err)
            }
        })
    }

    static patchTodo(req,res){
        const id = req.params.id
        const todoObj = {
            "status": req.body.status
        }
        Todo.update(todoObj,{where:{id: id}})
        .then(data=>{
            console.log(data[0]);
            if (data[0]==1) {
                res.status(200).json(todoObj)
            } else {
                res.status(404).json({msg: 'error not found'})
            }
        })
        .catch(err=>{
            if (err.name == 'SequelizeValidationError') {
                let errors = []
                err.errors.forEach(e=>{
                    errors.push(e.message)
                })
                res.status(400).json(errors)
            } else {
                res.status(500).json(err)
            }
        })
    }

    static deleteTodo(req,res){
        const id = req.params.id
        Todo.destroy({where:{id: id}})
        .then(data=>{
            console.log(data);
            if (data==1) {
                res.status(200).json({msg: 'todo success to dlete'})
            } else {
                res.status(404).json({msg: 'error not found'})
            }
        })
        .catch(err=>{
            res.status(500).json(err)
        })
    }
}

module.exports = todoController
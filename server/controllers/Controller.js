const {Todo} = require('../models')

class Controller{
    static getTodos(req, res){
        Todo.findAll()
        .then(data => {
            data.map(el => el.due_date = new Date(el.due_date + "UTC"))
            res.status(200).json(data)
        })
        .catch(() => {
            res.status(500).json({message: "Internal Server Error"})
        })
    }

    static addTodo(req, res){
        const value = {
            title: req.body.title,
            description: req.body.description,
            status: req.body.status,
            due_date: req.body.due_date
        }
        Todo.create(value)
        .then(data => {
            res.status(201).json(data)
        })
        .catch(err => {
            if(err.name === "SequelizeValidationError"){
                let errMsg = []
                err.errors.forEach(error => {
                    errMsg.push(error.message)
                });
                res.status(400).json(errMsg)
            } else {
                res.status(500).json({message: "Internal Server Error"})
            }
        })
    }

    static getTodoId(req, res){
        const id = req.params.id
        Todo.findByPk(id)
        .then(data => {
            if(data){
                data.due_date = new Date(data.due_date + "UTC")
                res.status(200).json(data)
            } 
            else res.status(404).json({message: "Data Not Found"})
            
        })
        .catch(() => {
            res.status(500).json({message: "Internal Server Error"})
        })
    }

    static putTodo(req, res){
        const id = req.params.id
        const value = {
            title: req.body.title,
            description: req.body.description,
            status: req.body.status,
            due_date: req.body.due_date
        }
        Todo.update(value,{where:{id}})
        .then(data => {
            if(data[0]){
                return Todo.findByPk(id)
            } 
            else res.status(404).json({message: "Data Not Found"})
        })
        .then(data => {
            res.status(200).json(data)
        })
        .catch(err => {
            console.log(err);
            if(err.name === "SequelizeValidationError"){
                res.status(400).json({message: "Due date not valid"})
            } else {
                res.status(500).json({message: "Internal Server Error"})
            }
        })
    }

    static patchTodo(req, res){
        const id = req.params.id
        const value = {
            status: req.body.status
        }
        Todo.update(value, {where:{id}})
        .then(data => {
            if(data[0]){
                return Todo.findByPk(id)
            } 
            else res.status(404).json({message: "Data Not Found"})
        })
        .then(data => {
            res.status(200).json(data)
        })
        .catch(err => {
            if (err.name === "SequelizeValidationError"){
                res.status(400).json({message: err.errors[0].message})
            } else {
                res.status(500).json({message: "Internal Server Error"})
            }
        })
    }

    static deleteTodo(req, res){
        const id = req.params.id
        Todo.destroy({where:{id}})
        .then(data => {
            if(data) res.status(200).json({message: "Todo success to deleted"})
            else res.status(404).json({message: "Data not found"})
        })
        .catch(() => {
            res.status(500).json({message: "Internal Server Error"})
        })
    }
}

module.exports = Controller
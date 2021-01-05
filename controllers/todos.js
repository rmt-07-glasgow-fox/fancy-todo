const {Todo} = require('../models/index')

class ControllerTodos{
    static index(req, res){
        Todo.findAll()
        .then(data => res.status(200).json(data))
        .catch(err => res.status(500).json(err))
    }
    static insert(req, res){
        // console.log(req.body);
        let obj = {
            title:req.body.title,
            description:req.body.description,
            status:req.body.status,
            due_date:req.body.due_date
        }
        console.log(obj);
        Todo.create(obj)
        .then(data => res.status(201).json(data))
        .catch(err => {
            if(err.name === "SequelizeValidationError"){
                return res.status(400).json(err)
            }else {
                return res.status(500).json(err)
            }
        })
    }
    static find(req, res){
        let id = +req.params.id
        let notFound = {
            message: "todo is not found"
        }
        Todo.findAll({where:{id}})
        .then((data) => {
            if(data[0]){
                res.status(200).json(data)
            }else {
                res.status(404).json(notFound)
            }
        })
        .catch(err => res.status(500).json(err))
    }
    static update(req, res){
        let id = +req.params.id
        let obj = {
            title:req.body.title,
            description:req.body.description,
            status:req.body.status,
            due_date:req.body.due_date
        }
        // console.log(obj);
        let notFound = {
            message: "todo is not found"
        }
        Todo.update(obj,{where: {id}})
        .then((data) => {
            // returning true (1) either false
            if(data[0]){
                res.status(200).json(obj)
            }else {
                res.status(404).json(notFound)
            }
        })
        .catch(err => {
            if(err.name === "SequelizeValidationError"){
                return res.status(400).json(err)
            }else {
                return res.status(500).json(err)
            }
        })
    }
    static patch(req, res){
        let id = +req.params.id
        let obj = {status:req.body.status}
        // console.log(obj);
        let notFound = {
            message: "todo is not found"
        }
        Todo.update(obj,{where: {id}})
        .then((data) => {
            // returning true (1) either false
            if(data[0]){
                res.status(200).json(obj)
            }else {
                res.status(404).json(notFound)
            }
        })
        .catch(err => {
            if(err.name === "SequelizeValidationError"){
                return res.status(400).json(err)
            }else {
                return res.status(500).json(err)
            }
        })
    }
    static delete(req, res){
        let id = +req.params.id
        let deleted = {
            message: 'todo success to delete'
        }
        let notFound = {
            message: "todo is not found"
        }
        Todo.destroy({where:{id}})
        .then((data) => {
            if(data === 1){
                res.status(200).json(deleted)
            }else {
                res.status(404).json(notFound)
            }
        })
        .catch(err => res.status(500).json(err))
    }
}

module.exports = ControllerTodos
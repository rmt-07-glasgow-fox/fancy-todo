const { User,Todo } = require('../models')

class TodoController{
    static getTodo(req,res){
        Todo.findAll({
            where:{
                status: true
            }
        })
        .then(data => {
            console.log(data);
            res.status(200).json(data)
        })
        .catch(err => {
            res.status(500).json({message: 'server error'})
        })
    }
    static addTodo(req,res){
        console.log(req.body);
        const newTodo = {
            name: req.body.name,
            type: req.body.type,
            description: req.body.description,
            date: req.body.date,
            time: req.body.time,
            UserId: req.user.id
        }
        Todo.create(newTodo)
        .then(data => {
            res.status(201).json(data)
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({message: 'server error'})
        })
    }
    static deleteTodo(req,res){
        console.log(req.params,'ini req params');
        Todo.destroy({
            where: {
                id:req.params.id
            }
        })
        .then(() => {
            res.status(200).json({message: 'Todo has been deleted'})
        })
        .catch(err => {
            res.status(500).json({message: 'server error'})
        })
    }
    static editTodo(req,res){
        const newTodo = {
            name: req.body.name,
            type: req.body.type,
            description: req.body.description,
            date: req.body.date,
            time: req.body.time
        }
        console.log(newTodo, 'ada disini guys line 59');
        Todo.update(newTodo, {
            where:{
                id: req.params.id
            }
        })
        .then(data => {
            console.log(req.body, 'masuk');
            res.status(200).json(data)
        })
        .catch(err => {
            console.log('masuk sini');
            res.status(405).json({message: 'Wrong data update'})
        })
    }
    static editOne(req,res){
        const newTodo = {
            status: false
        }
        Todo.update(newTodo, {
            where:{
                id:req.params.id
            }
        })
        .then(data => {
            console.log(data, 'disini');
            res.status(200).json(data)
        })
        .catch(err => {
            console.log(err, 'ini');
            res.status(405).json({message: 'Wrong data update'})
        })
    }
}

module.exports = TodoController
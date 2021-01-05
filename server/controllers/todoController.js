
const {Todo} = require('../models/index')

class Controller{
    static home(req, res){
        res.send(`Hello Welcome`)
    }

    static postTodo(req, res){
        let obj = {
            title: req.body.title,
            description: req.body.description,
            status: false,
            due_date: req.body.due_date,
            userId: req.user.id
        }
        Todo.create(obj)
        .then(data =>{
            return res.status(201).json(data)
        })
        .catch(err =>{
            if(err.name === 'SequelizeValidationError'){
                return res.status(400).json({
                    msg: `should using date from today or after today`
                })
            }
            return res.status(500).json({
                msg: `error from the server`
            })
        })
    }

    static todoShow(req, res){
        Todo.findAll()
        .then(data =>{
            return res.status(200).json(data)
        })
        .catch(err =>{
            return res.status(500).json(err)
        })
    }

    static todoById(req, res){
        let id = req.params.id
        Todo.findByPk(id)
        .then(data =>{
            if(!data){
                return res.status(404).json({
                    msg: `error not found`
                })
            }
            return res.status(200).json(data)
        })
        .catch(err =>{
            return res.status(500).json(err)
        })
    }

    static updateTodo(req, res){
        let id = req. params.id
        let obj = {
            title: req.body.title,
            description: req.body.description,
            status: false,
            due_date: req.body.due_date
        }
        Todo.update(obj, {where: {id}})
        .then(data=>{
            return Todo.findByPk(id)
        })
        .then(data =>{
            if(!data){
                return res.status(404).json({
                    msg: `error not found`
                })
            }
            return res.status(200).json(data)
        })
        .catch(err =>{
            if(err.name === 'SequelizeValidationError'){
                return res.status(400).json({
                    msg: `should using date from today or after today`
                })
            }
            return res.status(500).json({
                msg: `error from the server`
            })
        })
    }

    static editSpecify(req, res){
        let id = req.params.id
        let obj = {
            status: req.body.status
        }
        Todo.update(obj, {where: {id}})
        .then(data =>{
            return Todo.findByPk(id)
        })
        .then(data =>{
            if(!data){
                return res.status(404).json({
                    msg: `error not found`
                })
            }
            return res.status(200).json(data)
        })
        .catch(err =>{
            if(err.name === 'SequelizeValidationError'){
                return res.status(400).json({
                    msg: `should using date from today or after today`
                })
            }
            return res.status(500).json({
                msg: `error from the server`
            })
        })
    }

    static deleteTodo(req, res){
        let id = req.params.id

        Todo.destroy({where: {id}})
        .then(data =>{
            if(!data){
                return res.status(404).json({msg: `error not found`})
            }
            return res.status(200).json({msg: `todo success to delete`})
        })
        .catch(err =>{
            return res.status(500).json(err)
        })
    }
}

module.exports = Controller
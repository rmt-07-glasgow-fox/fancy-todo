const {Todo} = require('../models')
class TodosController{
    static showTodos (req, res, next) {
        Todo.findAll({where: {
            UserId: req.user.id
        }})
        .then(result => {
            return res.status(200).json(result);
        })
        .catch(err => {
            next(err)
        })
    }
    static saveTodos(req, res, next) {
        const bodyObj = {
            title : req.body.title,
            description : req.body.description,
            status : req.body.status,
            due_date : req.body.due_date,
            UserId: req.user.id
        }
        Todo.create(bodyObj)
        .then(data => {
            return res.status(201).json(data);
        })
        .catch(err => {
            next(err)
        })
    }
    static showTodosById(req, res, next) {
        let id = +req.params.id
        Todo.findByPk(id, {where: {
            UserId: req.user.id
        }})
        .then(data => {
            if(data) {
                res.status(200).json(data)
            }else if (data === null) {
                next({name: "resourceNotFound"})
            }
        })
        .catch(err => {
            next(err)
        })
    }
    static updateTodos (req, res, next) {
        let id = +req.params.id
        const bodyObj = {
            title : req.body.title,
            description : req.body.description,
            due_date : req.body.due_date,
            UserId: req.user.id
        }
        Todo.update(bodyObj, { where : {id} })
        .then(data => {
            if (data === 0){
                next({name: "resourceNotFound"})
            }else {
                res.status(200).json({message: 'Succes Update todos'})
            }
        })
        .catch(err => {
            next(err)
        })
    }
    static patchTodos (req, res, next) {
        let id = +req.params.id
        let { status } = req.body
        Todo.update({ status }, { where : {id} })
        .then(data => {
            if(data[0] === 0){
                next({name: "resourceNotFound"})
            }else {
                res.status(200).json({message: 'Success Update Status'})
            }
        })
        .catch(err => {
           next(err)
        })
    }
    static deleteTodos(req, res, next) {
        let id = +req.params.id
        Todo.destroy({ where : {id} })
        .then(data => {
            if (data === 0){
                next({name: "resourceNotFound"})
            }else {
                res.status(200).json({message: 'Todos Success to Delete'})
            }
        })
        .catch(err => {
            next(err)
        })
    }
}

module.exports = TodosController


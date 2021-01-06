const { Todo } = require('../models/index')

class ControllerTodos{
    static findTodos(req, res, next) {
        Todo.findAll({
            where: {
                userId: +req.user.id
            }
        })
        .then(data => {
            res.status(200).json(data)
        })
        .catch(err => {
            next(err)
        })
    }
    static insert(req, res, next) {
        let obj = {
            title:req.body.title,
            description:req.body.description,
            status:req.body.status,
            due_date:req.body.due_date,
            userId: req.user.id
        }
        Todo.create(obj)
        .then(data => res.status(201).json(data))
        .catch(err => {
            next(err)
        })
    }
    static findOne(req, res, next) {
        let id = req.params.id
        console.log(id);
        Todo.findByPk(id)
        .then(data => {
            console.log(data);
            if(data !== null) {
                res.status(200).json(data)
            } else {
                next({
                    name: "ResourceNotFound" 
                })
            }
        })
        .catch(() => {
            next(err)
        })
    }
    static update(req, res, next) {
        let id = +req.params.id
        let obj = {
            title:req.body.title,
            description:req.body.description,
            status:req.body.status,
            due_date:req.body.due_date
        }
        Todo.update(obj,{
            where: {
                id
            },
            returning: true
        })
        .then((data) => {
            // returning true (1) either false
            if(data[0]) {
                res.status(200).json(data[1])
            } else {
                next({
                    name: "ResourceNotFound" 
                })
            }
        })
        .catch(err => {
            next(err)
        })
    }
    static patch(req, res, next) {
        let id = +req.params.id
        let obj = { status:req.body.status }
        Todo.update(obj, {
            where: {
                id
            },
            returning: true
        })
        .then((data) => {
            // returning true (1) either false
            if(data[0]){
                res.status(200).json(data[1])
            } else {
                next({
                    name: "ResourceNotFound" 
                })
            }
        })
        .catch(err => {
            next(err)
        })
    }
    static delete(req, res, next) {
        let id = +req.params.id
        let deleted = {
            name: 'todo success to delete'
        }
        Todo.destroy({
            where: {
                id
            }
        })
        .then((data) => {
            if(data === 1) {
                res.status(200).json(deleted)
            } else {
                next({
                    name: "ResourceNotFound" 
                })
            }
        })
        .catch(() =>  {
            next(err)
        })
    }
}

module.exports = ControllerTodos
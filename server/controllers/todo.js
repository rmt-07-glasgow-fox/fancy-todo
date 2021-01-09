const {Todo} = require('../models')

class ControllerTodo {
    static readTodo(req, res, next){
        console.log("APA AKU MASUK READ TODO?")
        Todo.findAll()
        .then(data => {
            res.status(200).json({data})
        })
        .catch(err => {
            next(err)
        })
    }

    static createTodo(req, res, next){
        console.log("DIa MASUK CREATE TODO YAA")
        console.log(req.body)
        console.log(req.user.id,".....masuk ga user")
        const {title, description, status, due_date} = req.body
        Todo.create({title, description, status, due_date: new Date(due_date), user_id:req.user.id, createdAt: new Date(), updatedAt: new Date()})
        .then(data => {
            res.status(200).json({data})
            console.log("BERHASIL")
        })
        .catch(err => {
            console.log(err.stack, "GAGAL")
            next(err)
        })
    }

    static getTodo(req, res, next){
        console.log(req.params)
        Todo.findByPk(+req.params.id)
        .then(data => {
            if(data){
                res.status(200).json({data})
            } else {
                next({name: "resourceNotFound"})
            }
        })
        .catch(err => {
            next(err)
        })
    }

    static putTodo(req, res, next){
        console.log("AKU MASUK PUT")
        console.log(req.body)
        const {title, description, status, due_date} = req.body
        Todo.update({title, description, status, due_date:new Date(due_date)}, {
            where: {
                id: +req.params.id
            }
        })
        .then(data => {
            console.log("BERHASIL PUT")
            if(data){
                res.status(200).json({
                    message: "Data updated"
                })
            } else {
                next({name: "resourceNotFound"})
            }
        })
        .catch(err => {
            console.log("GAGAL PUT")
            next(err)
        })
    }

    static patchTodo(req, res, next){
        const {status} = req.body
        Todo.update({status}, {
            where: {
                id: +req.params.id
            }
        })
        .then(data => {
            if(data){
                res.status(200).json({
                    message: "Data updated"
                })
            } else {
                next({name: "resourceNotFound"})
            }
        })
        .catch(err => {
            next(err)
        })
    }

    static deleteTodo(req, res, next){
        console.log(req.params,">>>>>>MASUK DELETE")
        Todo.destroy({
            where: {
                id: +req.params.id
            }
        })
        .then(data => {
            console.log("TERHAPUS DONG")
            if(data){
                res.status(200).json({
                    message: "One To-do is deleted"
                })
            } else {
                next({name: "resourceNotFound"})
            }
        })
        .catch(err => {
            next(err)
        })
    }
}

module.exports = ControllerTodo
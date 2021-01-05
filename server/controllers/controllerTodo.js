const { Todo } = require('../models')

class ControllerTodo {

    static createTodo(req,res,next) {
        const obj = {
            title: req.body.title,
            UserId: req.loggedInUser.id,
            description: req.body.description,
            status: req.body.status,
            due_date: req.body.due_date,
            createdAt: new Date(),
            updatedAt: new Date()
        }
        Todo.create(obj)
        .then( data => {
            res.status(201).json({
                id: data.id,
                title: data.title,
                description: data.description,
                status: data.status,
                due_date: data.due_date,
                UserId: data.UserId
            })
        })
        .catch(error => {
            next(error)
        })
    }

    static listTodo(req,res,next){
        Todo.findAll()
        .then(data => {
            res.status(200).json(data)
        })
        .catch(error => {
            res.status(500).json({ message: 'internal server error' })
        })
    }

    static findTodoById(req,res){
        Todo.findOne({where: {id: req.params.id}})
        .then(data => {
            if (data){
                res.status(200).json({
                    id: data.id,
                    title: data.title,
                    description: data.description,
                    status: data.status,
                    due_date: data.due_date,
                    UserId: data.UserId
                })
            } else {
                throw {
                    status: 404,
                    message: "todo not found"
                }
            }
        })
        .catch(error => {
            next(error)
        })
    }

    static updateTodo(req,res,next){
        Todo.update({
            title: req.body.title,
            description: req.body.description,
            status: req.body.status,
            due_date: req.body.due_date
        },{where: {id: req.params.id}})
        .then(data => {
            if (!data){
                throw {
                    status: 404,
                    message: "todo not found"
                }
            } else {
                return Todo.findOne({where: {id: req.params.id}})
                .then(data2 => {
                    if (data2){ 
                        res.status(200).json({
                            id: data.id,
                            title: data2.title,
                            description: data2.description,
                            status: data2.status,
                            due_date: data2.due_date,
                            UserId: data2.UserId
                        })
                    }else {
                        throw {
                            status: 404,
                            message: "todo not found"
                        }
                    }
                })
            }
        })
        .catch(error => {
            next(error)
        })
    }

    static updateStatusTodo(req,res,next){
        Todo.update({
            status: req.body.status,
        },{where: {id: req.params.id}})
        .then(data => {
            return Todo.findOne({where: {id: req.params.id}})
            .then(data2 => {
                if (data2){
                    res.status(200).json({
                        id: data.id,
                        title: data2.title,
                        description: data2.description,
                        status: data2.status,
                        due_date: data2.due_date,
                        UserId: data2.UserId
                    })
                }else {
                    throw {
                        status: 404,
                        message: "todo not found"
                    }
                }
            })
        })
        .catch(error => {
            next(error)
        })
    }

    static deleteTodo(req,res,next){
        Todo.destroy({where: {id: req.params.id}})
        .then( data => {
            if (data){
                res.status(200).json({message: 'todo success to delete'})
            } else {
                throw {
                    status: 404,
                    message: "todo not found"
                }
            }
        })
        .catch( error => {
            next(error)
        })
    }
}

module.exports = ControllerTodo
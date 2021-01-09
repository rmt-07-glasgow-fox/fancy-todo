const { Todo,User } = require('../models')


class ControllerTodo {
    static getWeather (req,res,next) {
        const axios = require('axios');
        const params = {
          access_key: process.env.API_KEY_WEATHER,
          query: 'Jakarta'
        }
        axios.get('http://api.weatherstack.com/current', {params})
        .then(data => {
            return res.status(200).json(data.data)
        })
        .catch(error => {
            return next(error)
        })
    }

    static createTodo(req,res,next) {
        const obj = {
            title: req.body.title,
            UserId: req.loggedInUser.id,
            description: req.body.description,
            status: 'belum selesai',
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
        Todo.findAll({where: {UserId: req.loggedInUser.id}, include: User})
        .then(data => {
            res.status(200).json(data)
        })
        .catch(error => {
            next(error)
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
            status: "selesai",
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
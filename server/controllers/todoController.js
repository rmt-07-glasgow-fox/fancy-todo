
const {Todo} = require('../models/index')
const axios = require('axios')


class Controller{
    static home(req, res){
        res.send(`Hello Welcome`)
    }

    static postTodo(req, res, next){
        let obj = {
            title: req.body.title,
            description: req.body.description,
            status: req.body.status,
            due_date: req.body.due_date,
            userId: req.user.id
        }
        Todo.create(obj)
        .then(data =>{
            return res.status(201).json(data)
        })
        .catch(err =>{
            next(err)
        })
    }

    static todoShow(req, res, next){
        let temp
        
        let weatherApi = `http://api.weatherstack.com/current?access_key=${process.env.Weather_API}&query=jakarta`
        axios.get(weatherApi)
        .then(response =>{
            temp = response.data
            return Todo.findAll({where: {userId: req.user.id}})
        })
        .then(data =>{
            return res.status(200).json({
                todos: data, weather: temp
            })
        })
        .catch(err =>{
            next(err)
        })
    }

    static todoById(req, res, next){
        let id = +req.params.id
        let temp 
        let weather = process.env.Weather_API
        let weatherApi = `http://api.weatherstack.com/current?access_key=${process.env.Weather_API}&query=jakarta`
        axios.get(weatherApi)
        .then(response =>{
            //console.log(data)
            temp = response.data
           return Todo.findByPk(id)
        })
        .then(data =>{
            //console.log(data)
            return res.status(200).json({
                todos: data, weather:temp
            })
        })
        .catch(err =>{
            //console.log(err)
            //console.log(err)
            next(err)
        })
    }

    static updateTodo(req, res, next){
        let id = req. params.id
        let obj = {
            title: req.body.title,
            description: req.body.description,
            status: req.body.status,
            due_date: req.body.due_date
        }
        //console.log(obj)
        Todo.update(obj, {where: {id}, returning: true, plain:true})
        .then(data =>{
            //console.log(data)
            return res.status(200).json(data[1])
        })
        .catch(err =>{
            next(err)
        })
    }

    static editSpecify(req, res, next){
        let id = req.params.id
        let obj = {
            status: req.body.status
        }
        Todo.update(obj, {where: {id}, returning: true, plain:true})
        .then(data =>{
            return res.status(200).json(data[1])
        })
        .catch(err =>{
            next(err)
        })
    }

    static deleteTodo(req, res, next){
        let id = req.params.id

        Todo.destroy({where: {id}})
        .then(data =>{
            return res.status(200).json({msg: `todo success to delete`})
        })
        .catch(err =>{
            next(err)
        })
    }
}

module.exports = Controller
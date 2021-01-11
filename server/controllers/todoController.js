const axios = require('axios')
const {Todo} = require('../models')

class TodoController {
    static todoPage (req, res, next){
        // res.send('hello world')
        Todo.findAll({where: { user_id: req.user.id},order: [['id', 'DESC']]})
        .then(data => {
            res.status(200).json(data)
        })
        .catch(err => {
            next({code: 500})
        })
    }

    static todoByid (req, res, next) {
        Todo.findOne({
            where:{id: req.params.id}
        })
        .then(data => {
            res.status(200).json(data)
        })
        .catch(err => {
            next({code: 404})
        })
    }

    static createTodo (req,res, next){
        const todoObj = {
            title : req.body.title,
            description: req.body.description,
            status: req.body.status,
            due_date: req.body.due_date,
            user_id: req.user.id
        }
        Todo.create(todoObj)
        .then(data => {
            res.status(201).json(data)
        })
        .catch(err => {
            console.log(err)
            next({code: 500})
        })
    }
    
    static updateTodo (req,res,next) {
        let todoObj = {
            title : req.body.title,
            description: req.body.description,
            status: req.body.status,
            due_date: req.body.due_date
        }
        Todo.update(todoObj,{
            where:{id:req.params.id}
        })
        .then(data =>{
            res.status(200).json(data)
        })
        .catch(err =>{
            next({code:500})
        })
    }

    static statusChange(req,res,next) {
        let todoObj = {
            status : req.body.status
        }
        Todo.update(todoObj,{where:{id:req.params.id}})
        .then(data =>{
            res.status(200).json(data)
        })
        .catch(err =>{
           next({code:404})
        })
    }

    static deleteTodo (req, res, next) {
        Todo.destroy({where:{id:req.params.id}})
        .then(data => {
            if(data == 1) {
                res.status(200).json({message: 'data deleted sucessfully'})
            } else {
                return next({code:404})
            }
        })
        .catch(err => {
            next({code: 500})
        })

    }
    static getWeather (req, res,next){

        let weatherUrl = `http://api.openweathermap.org/data/2.5/weather?q=Palembang&mode=json&units=metric&appid=${process.env.WEATHER_KEY}`
        axios.get(weatherUrl)
            .then(response => {
                let element = {
                    weather: response.data.weather[0].description,
                    temp: response.data.main.temp,
                    city: response.data.name,
                }
                res.status(200).json(element)
            })
            .catch((err) => {
                next({ code: 401, msg:'api error'})
            })
    }
}



module.exports = {TodoController}
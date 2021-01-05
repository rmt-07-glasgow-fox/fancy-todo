const { ToDo } = require('../models')
const axios = require('axios')

class ToDoController {
  static getAllTasks(req, res, next){
    ToDo.findAll({
      where:{
        UserId: req.userData.id
      },
      order: [
        ['id', 'ASC']
      ]
    })
      .then(data => {
        if(data.length === 0){
          res.status(200).json({
            message: "No data please create one"
          })
        }
        res.status(200).json(data)
      })
      .catch(err => {
        next({
          status: 500,
          data: err
        })
      })
  }
  static handleAddTask(req, res, next){
    ToDo.create({
      title: req.body.title || '',
      description: req.body.description || '',
      status: req.body.status || '',
      due_date: req.body.due_date || '',
      UserId: req.userData.id
    })
      .then(data => {
        res.status(201).json(data)
      })
      .catch(err => {
        if(err.errors){
          let errors = []
          err.errors.forEach(error => {
            errors.push(error.message)
          })
          next({
            status: 400,
            data: errors
          })
        }
        next({
          status: 500,
          data: err
        })
      })
  }
  static getTaskById(req, res, next){
    ToDo.findByPk(req.params.id)
      .then(data => {
        if(data){
          res.status(200).json(data)
        }else{
          next({
            status: 404
          })
        }
      })
      .catch(err => {
        next({
          status: 500,
          data: err
        })
      })
  }
  static handleEditData(req, res, next){
    ToDo.update(req.body, {
      where:{
        id: req.params.id
      }
    })
      .then(data => {
        if(data[0] === 1){
          res.status(200).json(req.body)
        }else{
          next({
            status: 404
          })
        }
      })
      .catch(err => {
        if(err.errors){
          let errors = []
          err.errors.forEach(error => {
            errors.push(error.message)
          })
          next({
            status: 400,
            data: errors
          })
        }
        next({
          status: 500,
          data: err
        })
      })
  }
  static handlePatch(req, res, next){
    ToDo.update(
      {
        status: req.body.status
      }, 
      {
        where:{
          id: req.params.id
        },
        returning: true
      },
    )
      .then(data => {
        if(data[0] === 1){
          res.status(200).json({
            data: data[1][0]
          })
        }else{
          next({
            status: 404
          })
        }
      })
      .catch(err => {
        if(err.errors){
          let errors = []
          err.errors.forEach(error => {
            errors.push(error.message)
          })
          next({
            status: 400,
            data: errors
          })
        }
        next({
          status: 500,
          data: err
        })
      })
  }
  static handleDelete(req, res, next){
    ToDo.destroy({
      where:{
        id: req.params.id
      }
    })
      .then(data => {
        if(data === 1){
          res.status(200).json({
            message: 'todo success to delete'
          })
        }else{
          next({
            status: 404
          })
        }
      })
      .catch(err => {
        next({
          status: 500,
          data: err
        })
      })
  }
  static getNews(req, res, next){
    axios.get(`https://newsapi.org/v2/top-headlines?country=id&apiKey=${process.env.NEWSAPI_API_KEY}`)
      .then((el) => {
        res.status(200).json(el.data)
      })
      .catch(err => next({
        status: 500,
        data: err
      }))
  }
  static getCurrentWeather(req, res, next){
    axios.get(`https://api.openweathermap.org/data/2.5/weather?q=bandung&appid=${process.env.OPENWEATHER_API_KEY}`)
      .then((el) => {
        res.status(200).json(el.data)
      })
      .catch(err => next({
        status: 500,
        data: err
      }))
  }
}

module.exports = ToDoController
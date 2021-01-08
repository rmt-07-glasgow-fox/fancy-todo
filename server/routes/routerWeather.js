const router = require('express').Router()
const weatherController = require('../controller/weatherController')
const todoController = require('../controller/todoController')


router.get('/weather', weatherController.getWeather)
// router.get('/weather', todoController.getAllTodo)



module.exports = router

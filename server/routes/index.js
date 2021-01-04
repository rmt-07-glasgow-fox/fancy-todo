const route = require('express').Router()
const Controller = require('../controllers/homeController')
const todos = require('./todos')

route.get('/', Controller.home)

route.use('/todos', todos)

module.exports = route
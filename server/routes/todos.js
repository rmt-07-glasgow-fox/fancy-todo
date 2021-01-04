const route = require('express').Router()
const Controller = require('../controllers/todoController')

route.post('/', Controller.create)

module.exports = route
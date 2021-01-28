const route = require('express').Router()
const Controller = require('../controllers/homeController')
const todos = require('./todos')
const auth = require('./auth')
const api = require('./api')
const authentication = require('../middlewares/authentication')
const errorHandler = require('../middlewares/errorHandler')

route.get('/', Controller.home)
route.use('/', auth)
route.use(authentication)
route.use(api)
route.use('/todos', todos)

route.use(errorHandler)

module.exports = route
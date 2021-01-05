const routes = require('express').Router()
const ControllerUser = require('../controllers/userController')

routes.post('/register', ControllerUser.register)
routes.post('/login', ControllerUser.login)

module.exports = routes

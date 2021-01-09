const route = require('express').Router()
const Controller = require('../controllers/controller-user')

// route and endpoints
route.post('/register', Controller.register)
route.post('/login', Controller.login)
route.post('/loginGoogle', Controller.loginGoogle)

module.exports = route
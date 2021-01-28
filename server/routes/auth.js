const Controller = require('../controllers/authController')

const route = require('express').Router()

route.post('/register', Controller.register)
route.post('/login', Controller.login)
route.post('/loginGoogle', Controller.loginGoogle)

module.exports = route
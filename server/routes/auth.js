const Controller = require('../controllers/authController')

const route = require('express').Router()

route.post('/register', Controller.register)
route.post('/login', Controller.login)

module.exports = route
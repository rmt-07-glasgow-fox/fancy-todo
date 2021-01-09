const userRoute = require('express').Router()
const UserController = require('../controllers/UserController')

userRoute.post('/register', UserController.register)
userRoute.post('/login', UserController.login)
userRoute.post('/google', UserController.loginGoogle)

module.exports = userRoute
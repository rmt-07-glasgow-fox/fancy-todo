const rout = require('express').Router()
const userController = require('../controllers/userController')

rout.post('/signUp',userController.signUp)
rout.post('/signIn',userController.signIn)
rout.post('/signIn/google',userController.oAuth)
rout.get('/news',userController.getNews)

module.exports = rout
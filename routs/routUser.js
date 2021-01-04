const rout = require('express').Router()
const userController = require('../controllers/userController')

rout.post('/signUp',userController.signUp)
rout.post('/signIn',userController.signIn)

module.exports = rout
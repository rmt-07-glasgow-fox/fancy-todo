const router = require('express').Router()
const { UserController, TodoController } = require('../controllers')
const authentication = require('../middlewares/authentication.js')

//User routes

router.post('/register', UserController.register)
router.post('/login', UserController.login)


//Todo routes

// router.use(authentication)



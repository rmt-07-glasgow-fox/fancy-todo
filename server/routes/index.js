const router = require('express').Router()
const { UserController, TodoController } = require('../controllers')
const authentication = require('../middlewares/authentication.js')
const authorization = require('../middlewares/authorization.js')

//User routes

router.post('/register', UserController.register)
router.post('/login', UserController.login)


//Todo routes

router.use(authentication)
router.get('/todos', TodoController.fetch)
router.post('/todos', TodoController.add)



module.exports = router



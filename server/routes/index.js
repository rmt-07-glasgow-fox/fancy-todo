const router = require('express').Router()
const { UserController, TodoController } = require('../controllers')
const authentication = require('../middlewares/authentication.js')
const authorization = require('../middlewares/authorization.js')

//User routes

router.post('/register', UserController.register)
router.post('/login', UserController.login)
router.post('/googleLogin', UserController.googleLogin)


//Todo routes

router.use(authentication)
router.get('/todos', TodoController.fetch)
router.post('/todos', TodoController.add)
router.get('/todos/:id', authorization, TodoController.fetchById)
router.patch('/todos/:id', authorization, TodoController.updateDoneById)
router.delete('/todos/:id', authorization, TodoController.deleteById)
router.put('/todos/:id', authorization, TodoController.editById)


module.exports = router



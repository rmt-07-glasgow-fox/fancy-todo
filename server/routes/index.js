const router = require('express').Router()
const { UserController} = require('../controllers/user_controllers')
const todosRoutes = require('./todos')

router.post('/register', UserController.register)
router.post('/login', UserController.login)
router.use('/todos', todosRoutes)


module.exports = router
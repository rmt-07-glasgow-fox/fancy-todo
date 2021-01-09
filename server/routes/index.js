const router = require('express').Router()
const { UserController} = require('../controllers/user_controllers')
const { ApiController } = require('../controllers/api_controllers')
const { authenticate } = require('../middlewares/auth')
const todosRoutes = require('./todos')

router.post('/register', UserController.register)
router.post('/login', UserController.login)
router.post('/googleLogin', UserController.googleLogin)
router.get('/holidays', ApiController.getHolidays)
router.use(authenticate)
router.use('/todos', todosRoutes)


module.exports = router
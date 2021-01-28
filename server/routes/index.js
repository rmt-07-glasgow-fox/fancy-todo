const router = require('express').Router()
const { UserController} = require('../controllers/user_controllers')
const { ApiController } = require('../controllers/api_controllers')
const { authenticate } = require('../middlewares/auth')
const todosRoutes = require('./todos')

router.post('/register', UserController.register)
router.post('/login', UserController.login)
router.post('/googleLogin', UserController.googleLogin)
router.use(authenticate)
router.get('/news', ApiController.getNews)
router.use('/todos', todosRoutes)


module.exports = router
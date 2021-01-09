const router = require('express').Router()
const todoRouter = require('./todo')
const authRouter = require('./auth')
const { authenticate } = require('../middlewares/auth')
const weatherController = require('../controllers/weatherController')

router.use('/user', authRouter)
router.use(authenticate)
router.use('/todos', todoRouter)
router.get('/weather', weatherController.getAll)

module.exports = router
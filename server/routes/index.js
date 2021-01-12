const router = require('express').Router()
const todosRouter = require('./todos.js')
const authRouter = require('./auth.js')
const { authenticate } = require('../middlewares/auth.js')
const Controller = require('../controllers')

router.get('/', Controller.getJoke)
router.use(authRouter)

router.use(authenticate)
router.use('/todos', todosRouter)

module.exports = router
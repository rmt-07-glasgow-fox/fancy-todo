const router = require('express').Router()

const todoRouter = require('./todo')
const authRouter = require('./auth')
const projectRouter = require('./project')
const userRouter = require('./user')
const weatherRouter = require('./weather')
const { authenticate } = require('../middlewares/auth')

router.use(authRouter)
router.use(authenticate)
router.use('/todos', todoRouter)
router.use('/projects', projectRouter)
router.use('/users', userRouter)
router.use('/weather', weatherRouter)

module.exports = router
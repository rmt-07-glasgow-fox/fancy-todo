const router = require('express').Router()
const todoRouter = require('./todoRouter')
const authRouter = require('./authRouter')
const weatherRouter = require('./weatherRouter')
const { authenticate } = require('../middlewares/auth')


router.use('/users', authRouter)
router.use(authenticate)
router.use('/weather', weatherRouter)
router.use('/todos', todoRouter)

module.exports = router



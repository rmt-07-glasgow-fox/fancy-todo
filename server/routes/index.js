const router = require('express').Router()
const todoRouter = require('./todo')
const authRouter = require('./auth')
const {authenticate} = require('../middlewares/auth')

router.use(authRouter)
router.use(authenticate)
router.use('/todos', todoRouter)

module.exports = router
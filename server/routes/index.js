const router = require('express').Router()

const todosRouter = require('./todos')
const userRouter = require('./user')
const { authenticate } = require('../middlewares/auth')

router.use('/', userRouter)
router.use('/todos', authenticate)
router.use('/todos', todosRouter)


module.exports = router

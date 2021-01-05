const express = require('express')
const router = express.Router()
const todosRouter = require('./todosRoutes')
const userRouter = require('./userRoutes')
const { authentication } = require('../middlewares/auth')

router.use(userRouter)
router.use(authentication)
router.use('/todos', todosRouter)

module.exports = router
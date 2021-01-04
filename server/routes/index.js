const router = require('express').Router()

const todoRouter = require('./todo')
const authRouter = require('./auth')

router.use(authRouter)
router.use('/todos', todoRouter)

module.exports = router
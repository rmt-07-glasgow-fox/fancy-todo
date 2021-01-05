const router = require('express').Router()
const todoRouter = require('./todoRouter')
const authRouter = require('./authRouter')

router.use(authRouter)
router.use('/todos', todoRouter)

module.exports = router



const router = require('express').Router()
const authRouter = require('./auth')
const todoRouter = require('./todo')

router.use(authRouter)
router.use(todoRouter)

module.exports = router

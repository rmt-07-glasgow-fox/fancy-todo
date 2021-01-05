const router = require('express').Router()
const authRouter = require('./auth')
const todoRouter = require('./todo')
const { authenticate } = require('../middlewares/auth')

router.use(authRouter)
router.use(authenticate) // req { Headers, params, query, body, user }
router.use(todoRouter)

module.exports = router

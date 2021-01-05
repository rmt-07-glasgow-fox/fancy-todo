const router = require("express").Router()
const auth = require('./auth.js')
const todo = require('./todo.js')
const { authenticate } = require('../middlewares/auth')

router.use(auth)

router.use(authenticate)

router.use('/todos', todo)

module.exports = router
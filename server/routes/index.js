const express = require('express')
const router = express.Router()
const todos = require('../routes/todos')
const user = require('../routes/user')
const {authentication} = require('../midedlewares/auth')

router.use('/', user)

router.use(authentication)
router.use('/', todos)

module.exports = router
const express = require('express')
const router = express.Router()
const todos = require('../routes/todos')
const user = require('../routes/user')

router.use('/', todos)
router.use('/', user)

module.exports = router
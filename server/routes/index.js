const express = require('express')
const router = express.Router()
const todos = require('../routes/todos')
const user = require('../routes/user')
const calendar = require('../routes/calendar')
const {authentication} = require('../midedlewares/auth')

router.use('/', user)
router.use('/', calendar)

// router.use(authentication)
router.use('/', todos)

module.exports = router
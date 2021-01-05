const express = require('express')
const router = express.Router()
const toDo = require('./todo')
const user = require('./user')
const { authenticate } = require('../middlewares/auth')


router.use('/users', user)
router.use(authenticate)
router.use('/todos', toDo)

module.exports = router;
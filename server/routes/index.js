const express = require('express')
const router = express.Router()
const todos = require('./todoRoutes')
const users = require('./userRoutes')

router.use('/todos', todos)
router.use('/', users)

module.exports = router
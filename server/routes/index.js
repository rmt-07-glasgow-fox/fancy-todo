const express = require('express')
const router = express.Router()
const todos = require('./todoRoutes')

router.use('/todos', todos)

module.exports = router
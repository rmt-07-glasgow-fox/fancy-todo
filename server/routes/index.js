const express = require('express')
const router = express.Router()
const toDo = require('./todo')

router.use('/todos', toDo)

module.exports = router;
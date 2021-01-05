const express = require('express')
const router = express.Router()
const todos = require('./todos')
const wp = require('./wp')

router.get('/', wp)
router.use('/todos', todos)


module.exports = router;
const router = require('express').Router()
const todos = require('./todos')
const user = require('./users')
const api = require('./api')

router.use('/api', api)
router.use('/todos', todos)
router.use('/', user)


module.exports = router

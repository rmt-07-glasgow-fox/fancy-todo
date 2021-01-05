const router = require('express').Router()
const todos = require('./todos')
const user  = require('./user')


router.use(user)

router.use('/todos', todos)


module.exports = router
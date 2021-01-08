const router = require('express').Router()
const todos = require('./todos')
const user  = require('./user')
const {authenticate} = require('../middlewares/authenticate')

router.use(user)
router.use(authenticate)
router.use('/todos', todos)


module.exports = router
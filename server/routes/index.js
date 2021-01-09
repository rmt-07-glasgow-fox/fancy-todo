const router = require('express').Router()
const todos = require('./todos')
const user  = require('./user')
const calendar = require('./calender')
const {authenticate} = require('../middlewares/authenticate')

router.use(user)
router.use(authenticate)
router.use('/todos', todos)
router.use(calendar)


module.exports = router
const express = require('express')
const router = express.Router()
const todo = require('./todo')
const auth = require('./auth')
const {authenticate} = require('../middleware/auth')
const resto = require('./zomato.js')




router.use('/', auth)
router.use(authenticate)
router.use('/todos', todo )
router.use('/resto',resto )

module.exports = router
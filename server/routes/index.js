const { ApiController } = require('../controllers')
const { authenticate } = require('../middlewares')
const express = require('express')
const router = express.Router()
const todos = require('./todoRoutes')
const users = require('./userRoutes')

router.get('/quotes', ApiController.getQuotes)
router.use('/', users)
router.use(authenticate)
router.use('/todos', todos)

module.exports = router
const express = require('express')
const router = express.Router()
const todos = require('./todos')
const find = require('./find')
const authRouter = require('./auth')
const { authenticate } = require('../middleware/auth')
const { jokes, weather } = require('../controllers/jokes')

router.get("/jokes", jokes) 
router.get("/weather", weather) 
router.use(authRouter)
router.use(authenticate)
router.use('/find', find)
router.use('/todos', todos)


module.exports = router; 
const express = require('express')
const router = express.Router()
const todos = require('./todos')
const authRouter = require('./auth')
const { authenticate } = require('../middleware/auth')
const { jokes } = require('../controllers/jokes')

router.get("/jokes", jokes) 
router.use(authRouter)
router.use(authenticate)
router.use('/todos', todos)


module.exports = router; 
const express = require('express')
const router = express.Router()
const todoRouter = require('./todo')
const authRouter = require('./auth')
const { authenticate } = require('../middleware/auth')

router.get('/', (req, res) => {
    res.send('Hello World!')
})

router.use('/auth',authRouter)
router.use(authenticate)
router.use('/todos', todoRouter)

module.exports = router
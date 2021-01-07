const router = require('express').Router()
const todoRoute = require('./TodoRouter')
const userRoute = require('./UserRouter')

router.use(userRoute)
router.use('/todos', todoRoute)

module.exports = router
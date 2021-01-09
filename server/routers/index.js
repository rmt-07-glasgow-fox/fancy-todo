const router = require('express').Router()
const todoRoute = require('./TodoRouter')
const userRoute = require('./UserRouter')
const apiRoute = require('./3rdapi')

router.use(userRoute)
router.use('/todos', todoRoute)
router.use(apiRoute)

module.exports = router
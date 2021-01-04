const router = require('express').Router()
const todoRoutes = require('./todoRoutes')
const authRoutes = require('./authRoutes')

router.use(authRoutes)
router.use('/todos',todoRoutes)

module.exports = router
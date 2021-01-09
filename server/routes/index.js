const router = require('express').Router()
const todoRoutes = require('./todoRoutes')
const authRoutes = require('./authRoutes')

const authentication = require('../middlewares/auth').authentication

router.use(authRoutes)

router.use(authentication)
router.use('/todos',todoRoutes)

module.exports = router
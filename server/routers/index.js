const router = require ('express').Router()
const todoRouter = require ('./todoRouter')
const authRouter = require ('./auth')
const calRouter = require('./calendar')
const { authenticate } = require ('../middlewares/auth')

router.use (authRouter)

router.use (authenticate)

router.use ('/todos', todoRouter)

router.use(calRouter)

module.exports = router
const router = require ('express').Router()
const todoRouter = require ('./todoRouter')
const authRouter = require ("./auth")
const apiRouter = require ("./api")
const { authenticate } = require ('../middlewares/auth')

router.use (authRouter)

router.use (apiRouter)

router.use (authenticate)

router.use ('/todos', todoRouter)

module.exports = router
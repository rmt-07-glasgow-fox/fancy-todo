const router = require('express').Router()
const todoRouter = require('./todoRouter')
const userRouter = require('./userRouter')

const Controller = require('../controller/controller')

router.get('/', Controller.home)
router.use('/', userRouter)
router.use('/todos', todoRouter)

module.exports = router


const router = require('express').Router()
const todoRouter = require('./todoRouter')

const Controller = require('../controller/controller')

router.get('/', Controller.home)

router.use('/todos', todoRouter)

module.exports = router


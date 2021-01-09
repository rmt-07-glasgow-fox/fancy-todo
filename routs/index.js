const rout = require('express').Router()
const routTodo = require('../routs/routTodo')
const routUser = require('../routs/routUser')
const {authentication} = require('../middleware/auth')

rout.use('/',routUser)
rout.use(authentication)
rout.use('/todos',routTodo)

module.exports = rout
const rout = require('express').Router()
const routTodo = require('../routs/routTodo')
const routUser = require('../routs/routUser')

rout.use('/todos',routTodo)
rout.use('/',routUser)

module.exports = rout
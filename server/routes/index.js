const routes = require('express').Router()
const todoRouter = require('./todos')
const authRouter = require('./auth')

routes.get('/', (req, res) => {
  res.send('Welcome to another hell, enjoy your ride ^_^')
})

routes.use(authRouter)
routes.use('/todos', todoRouter)

module.exports = routes

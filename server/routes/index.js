const routes = require('express').Router()
const todoRouter = require('./todos')
const authRouter = require('./auth')
const { authentication } = require('../middlewares/authentication')

routes.get('/', (req, res) => {
  res.send('Welcome to another hell, enjoy your ride ^_^')
})

// Route Login & register
routes.use(authRouter)
// Route authentication
routes.use(authentication)
// Route todos CRUD
routes.use('/todos', todoRouter)

module.exports = routes

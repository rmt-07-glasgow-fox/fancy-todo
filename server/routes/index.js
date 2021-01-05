const express = require('express')
const router = express.Router()
const todosRouter = require('./todosRouter')
const authRouter = require('./authRouter')

router.get('/', (req, res) => {
  res.send('Welcome to my fancy todo app')
})

router.use(authRouter)
router.use('/todos', todosRouter)

module.exports = {router}
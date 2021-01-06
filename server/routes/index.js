const router = require('express').Router()
const todoRouter = require('./todos')
const authRouter = require('./auth')
const { authentication } = require('../middlewares/auth')

router.get('/', (req, res) => {
  return res.send('Hello World')
})

router.use('/', authRouter)
router.use(authentication)
router.use('/todos', todoRouter)

module.exports = router


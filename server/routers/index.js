const router = require('express').Router()
const authRouter = require('./auth')
const todos = require('./todos')
const newsRouter = require('./news')
const { authenticate } = require('../middlewares/auth')

router.get('/', (req, res) => {
    res.send('haloo')
})
router.use('/', authRouter)
router.use('/news', newsRouter)
router.use(authenticate)
router.use('/todos', todos)

module.exports = router
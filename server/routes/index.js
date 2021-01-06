const router = require('express').Router()
const todoRouter = require('./todoRoutes')
const authRouter = require('./authRoutes')
const apiRouter = require('./apiRoutes')
const { authenticate } = require('../middlewares/auth')

router.get('/', (req, res) => {
    res.send('<h1 style="text-align:center; margin-top: 20px;"><a href="/register">ENTER</a></h1>')
})

router.use('/', apiRouter) 
router.use('/', authRouter)
router.use(authenticate)
router.use('/todos', todoRouter)

module.exports = router
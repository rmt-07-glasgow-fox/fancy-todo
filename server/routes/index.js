const router = require('express').Router()
const todoRouter = require('./todoRouter')
const authRouter = require('./auth')
const authenticate = require('../middlewares/auth')

// declaring end-points
router.get('/', (req, res) => {
    res.send('This is the homepage todos app!')
})

router.use(authRouter)

router.use('/todos', authenticate, todoRouter)

module.exports = router 

const router = require('express').Router()
const todoRouter = require('./todoRouter')
const authRouter = require('./auth')
const isLoggedIn = require('../middlewares/authentication')

// declaring end-points
router.get('/', (req, res) => {
    res.send('This is the homepage todos app!')
})

router.use(authRouter)

router.use('/todos', isLoggedIn, todoRouter)

module.exports = router 

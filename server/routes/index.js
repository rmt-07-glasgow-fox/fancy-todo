const router = require('express').Router()
const todoRouter = require('./todoRouter')
const authRouter = require('./auth')

// declaring end-points
router.get('/', (req, res) => {
    res.send('This is the homepage todos app!')
})

router.use(authRouter)
router.use('/todos', todoRouter)

module.exports = router 

const router = require('express').Router()
const todosRouter = require('./todos.js')
const authRouter = require('./auth.js')

router.use('/todos', todosRouter)
router.use(authRouter)

router.get('/', (req, res) => {
    return res.status(200).json({
        msg: "Welcome"
    })
} )

module.exports = router
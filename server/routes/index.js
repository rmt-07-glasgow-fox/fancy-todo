const router = require('express').Router()
const todosRouter = require('./todos.js')
const authRouter = require('./auth.js')
const { authentication } = require('../middlewares/auth.js')

router.use(authRouter)
router.use(authentication)
router.use('/todos', todosRouter)

router.get('/', (req, res) => {
    return res.status(200).json({
        msg: "Welcome"
    })
} )

module.exports = router
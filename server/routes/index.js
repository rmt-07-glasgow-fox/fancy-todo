const router = require('express').Router()

const todosRouter = require('./todos')
const userRouter = require('./user')

router.get('/', (req, res) => res.send('Home'))
router.use('/', userRouter)
router.use('/todos', todosRouter)


module.exports = router

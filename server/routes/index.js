const router = require('express').Router()

const todosRouter = require('./todos')

router.get('/', (req, res) => res.send('Home'))
router.use('/todos', todosRouter)

module.exports = router

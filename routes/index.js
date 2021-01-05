const router = require('express').Router()
const TodoController = require('../controllers/todoController')
const todosRouter = require('./todos');
const authRouter = require('./auth');


// router.get('/todos')

router.use(authRouter)
router.use('/todos', todosRouter)

module.exports = router
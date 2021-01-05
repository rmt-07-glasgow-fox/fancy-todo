const router = require('express').Router()
const TodoController = require('../controllers/todoController')
const todosRouter = require('./todos');
const authRouter = require('./auth');
const {authenticate} = require('../middlewares/auth');

router.use(authRouter)
router.use(authenticate)

router.use('/todos', todosRouter)

module.exports = router
const router = require('express').Router()
const { TodoController } = require('../controllers')
const { authorize } = require('../middlewares/auth')

router.get('/', TodoController.home)
router.get('/todos', TodoController.todoList)
router.post('/todos', TodoController.todoAdd)
router.get('/todos/:id', TodoController.todoById)
router.put('/todos/:id', authorize, TodoController.todoUpdateAll)
router.patch('/todos/:id', authorize, TodoController.todoUpdateStatus)
router.delete('/todos/:id', authorize, TodoController.todoDelete)

module.exports = router
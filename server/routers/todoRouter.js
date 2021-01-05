const router = require('express').Router()
const { TodoController } = require('../controllers')

router.get('/', TodoController.home)
router.get('/todos', TodoController.todoList)
router.post('/todos', TodoController.todoAdd)
router.get('/todos/:id', TodoController.todoById)
router.put('/todos/:id', TodoController.todoUpdateAll)
router.patch('/todos/:id', TodoController.todoUpdateStatus)
router.delete('/todos/:id', TodoController.todoDelete)

module.exports = router
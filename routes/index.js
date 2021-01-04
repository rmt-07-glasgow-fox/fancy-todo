const router = require('express').Router()
const TodoController = require('../controllers/todoController')

// router.get('/todos')
router.post('/todos', TodoController.postTodo)
router.get('/todos', TodoController.getTodo)

router.get('/todos/:id', TodoController.getTodoById)
router.put('/todos/:id', TodoController.putTodo)
router.patch('/todos/:id', TodoController.patchTodo)
router.delete('/todos/:id', TodoController.deleteTodo)

module.exports = router
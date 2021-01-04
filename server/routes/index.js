const router = require('express').Router()
const TodoController = require('../controllers/todoController.js')

router.get('/todos', TodoController.getTodo)
router.post('/todos', TodoController.createTodo)
router.delete('/todos/:id', TodoController.removeTodo)

module.exports = router
const express = require('express')
const router = express.Router()
const TodoController = require('../controllers/todo-controller')

router.post('/todos', TodoController.postTodoHandler)
router.get('/todos', TodoController.getTodoHandler)
router.get('/todos/:id', TodoController.getTodoIdHandler)
router.put('/todos/:id', TodoController.putTodoIdHandler)
router.patch('/todos/:id', TodoController.patchTodoIdHandler)
router.delete('/todos/:id', TodoController.deleteTodoHandler)

module.exports = router
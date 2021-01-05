const express = require('express')
const router = express.Router()
const TodoController = require('../controllers/todo-controller')


router.post('/', TodoController.postTodoHandler)
router.get('/', TodoController.getTodoHandler)
router.get('/:id', TodoController.getTodoIdHandler)
router.put('/:id', TodoController.putTodoIdHandler)
router.patch('/:id', TodoController.patchTodoIdHandler)
router.delete('/:id', TodoController.deleteTodoHandler)

module.exports = router
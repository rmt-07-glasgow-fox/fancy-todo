const { TodoController } = require('../controllers')
const express = require('express')
const router = express.Router()

router.get('/', TodoController.getTodos)
router.post('/', TodoController.addTodo)
router.get('/:id', TodoController.getTodoId)
router.put('/:id', TodoController.putTodo)
router.patch('/:id', TodoController.patchTodo)
router.delete('/:id', TodoController.deleteTodo)

module.exports = router
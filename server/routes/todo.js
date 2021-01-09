const express = require('express')
const router = express.Router()
const TodoController = require('../controllers/todoController')
const { authenticate } = require('../middleware/auth')

router.get('/', TodoController.getTodo)
router.post('/', authenticate, TodoController.addTodo)

router.delete('/:id',authenticate, TodoController.deleteTodo)
router.put('/:id',authenticate, TodoController.editTodo)
router.patch('/:id',authenticate, TodoController.editOne)


module.exports = router
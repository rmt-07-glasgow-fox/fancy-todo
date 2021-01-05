const router = require('express').Router()
const TodoController = require('../controllers/todoController.js')

router.get('/', TodoController.getTodos)
router.get('/:id', TodoController.getTodo)
router.post('/', TodoController.createTodo)
router.put('/:id', TodoController.editTodo)
router.patch('/:id', TodoController.patchTodo)
router.delete('/:id', TodoController.removeTodo)

module.exports = router
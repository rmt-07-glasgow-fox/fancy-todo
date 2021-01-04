const router = require('express').Router()
const { TodoController } = require('../controllers/')

router.get('/', TodoController.getTodos)
router.get('/:id', TodoController.getTodoById)
router.post('/', TodoController.createTodo)
router.put('/:id', TodoController.putTodo)
router.patch('/:id', TodoController.patchTodo)
router.delete('/:id', TodoController.deleteTodo)

module.exports = router
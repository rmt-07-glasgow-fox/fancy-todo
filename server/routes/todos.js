const router = require('express').Router()
const TodoController = require('../controllers/todoController.js')

router.get('/', TodoController.getTodo)
router.post('/', TodoController.createTodo)
router.delete('/:id', TodoController.removeTodo)

module.exports = router
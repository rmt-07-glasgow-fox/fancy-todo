const router = require('express').Router()
const todoController = require('../controllers/todoController')

router.post('/', todoController.postTodo)
router.get('/', todoController.getTodo)

router.get('/:id', todoController.getTodoById)

router.put('/:id', todoController.putTodo)
router.patch('/:id', todoController.patchTodo)
router.delete('/:id', todoController.deleteTodo)

module.exports = router
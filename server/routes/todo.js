const router = require('express').Router()
const { TodoController } = require('../controllers/')
const { authorize } = require('../middlewares/auth')

router.get('/', TodoController.getTodos)
router.post('/', TodoController.createTodo)
router.get('/:id', authorize, TodoController.getTodoById)
router.put('/:id', authorize, TodoController.putTodo)
router.patch('/:id', authorize, TodoController.patchTodo)
router.delete('/:id', authorize, TodoController.deleteTodo)

module.exports = router
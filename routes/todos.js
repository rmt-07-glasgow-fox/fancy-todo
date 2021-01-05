const router = require('express').Router()
const TodoController = require('../controllers/todoController')
const {authorize} = require('../middlewares/auth')


router.post('/', TodoController.postTodo)
router.get('/', TodoController.getTodo)
router.get('/:id', authorize, TodoController.getTodoById)
router.put('/:id', authorize, TodoController.putTodo)
router.patch('/:id', authorize, TodoController.patchTodo)
router.delete('/:id', authorize, TodoController.deleteTodo)

module.exports = router
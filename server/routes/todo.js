const router = require('express').Router()
const TodoController = require('../controllers/TodoController')
const { authorization } = require('../middlewares/auth')

router.get('/', TodoController.listTodo)
router.post('/', TodoController.createTodo)

router.get('/:id', authorization, TodoController.selectTodo)
router.put('/:id', authorization, TodoController.updateTodo)
router.patch('/:id', authorization, TodoController.patchTodo)
router.delete('/:id', authorization, TodoController.deleteTodo)

module.exports = router
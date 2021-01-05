const router = require('express').Router()
const TodoController = require('../controllers/todoController.js')
const { authorize } = require('../middlewares/auth.js')

router.get('/', TodoController.getTodos)
router.post('/', TodoController.createTodo)

router.use('/:id', authorize)
router.get('/:id', TodoController.getTodo)
router.put('/:id', TodoController.editTodo)
router.patch('/:id', TodoController.patchTodo)
router.delete('/:id', TodoController.removeTodo)

module.exports = router
const router = require('express').Router()
const { TodoController } = require('../controllers/')
const { authorize } = require('../middlewares/auth')

router.get('/', TodoController.apiTime)
router.post('/', TodoController.createTodo)
router.use('/:id', authorize)
router.get('/:id', TodoController.getTodoById)
router.put('/:id', TodoController.putTodo)
router.patch('/:id', TodoController.patchTodo)
router.delete('/:id', TodoController.deleteTodo)

module.exports = router
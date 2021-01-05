const router = require('express').Router()
const { authorize } = require('../middlewares/auth')
const TodoController = require('../controllers/TodoController')

router.post('/', TodoController.createTodo)
router.get('/', TodoController.readTodo)
router.get('/:id', TodoController.getTodoById)


router.put('/:id', authorize, TodoController.updateTodoPut)
router.patch('/:id', authorize, TodoController.updateTodoPatch)
router.delete('/:id', authorize, TodoController.deleteTodo)

module.exports = router
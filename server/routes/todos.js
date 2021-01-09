const router = require('express').Router()

const todosController = require('../controllers/todos')
const { authorize } = require('../middlewares/auth')

router.post('/', todosController.createTodo)
router.get('/', todosController.getTodos)
router.get('/:id', authorize, todosController.getTodoById)
router.put('/:id', authorize, todosController.putTodoById)
router.patch('/:id', authorize, todosController.updateTodoStatus)
router.delete('/:id', authorize, todosController.deleteTodoById)

module.exports = router

const router = require('express').Router()

const todosController = require('../controllers/todos')

router.post('/', todosController.createTodo)
router.get('/', todosController.getTodos)
router.get('/:id', todosController.getTodoById)
router.put('/:id', todosController.putTodoById)


module.exports = router

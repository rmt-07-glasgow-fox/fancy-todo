const router = require('express').Router()
const TodoController = require('../controllers/TodoController')

router.post('/', TodoController.createTodo)
router.get('/', TodoController.readTodo)
router.get('/:id', TodoController.getTodoById)
router.put('/:id', TodoController.updateTodoPut)
// router.patch('/:id', TodoController.updateTodoPatch)
router.delete('//:id', TodoController.deleteTodo)

module.exports = router
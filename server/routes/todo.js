const router = require('express').Router()
const TodoController = require('../controllers/TodoController')

router.get('/', TodoController.listTodo)
router.post('/', TodoController.createTodo)


router.get('/:id', TodoController.selectTodo)
router.put('/:id', TodoController.updateTodo)
router.patch('/:id', TodoController.patchTodo)
router.delete('/:id', TodoController.deleteTodo)

module.exports = router
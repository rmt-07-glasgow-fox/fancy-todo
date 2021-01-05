const router = require('express').Router()
const {TodoController} = require('../controllers/todo_controllers')

router.get('/', TodoController.findTodos)
router.post('/', TodoController.addTodos)
router.get('/:id', TodoController.findTodoById)
router.put('/:id', TodoController.update)
router.patch('/:id', TodoController.editStatus)
router.delete('/:id', TodoController.delete)


module.exports = router
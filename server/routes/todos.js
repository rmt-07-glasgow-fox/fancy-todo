const router = require('express').Router()
const {TodoController} = require('../controllers/todo_controllers')
const { authorize } = require('../middlewares/auth')

router.get('/', TodoController.findTodos)
router.post('/', TodoController.addTodos)
router.get('/:id', authorize, TodoController.findTodoById)
router.put('/:id', authorize, TodoController.update)
router.patch('/:id', authorize, TodoController.editStatus)
router.delete('/:id', authorize, TodoController.delete)


module.exports = router
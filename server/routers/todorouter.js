const router = require ("express").Router()
const ToDoController = require ('../controllers/todo')
const { authorize } = require ('../middlewares/auth')


router.get('/', ToDoController.todoList)
router.get('/:id', authorize, ToDoController.pickTodo)

router.post('/', ToDoController.addTodo)

router.put('/:id', authorize, ToDoController.editTodo)
router.patch('/:id', authorize, ToDoController.patchTodo)

router.delete('/:id', authorize, ToDoController.deleteTodo)

module.exports = router
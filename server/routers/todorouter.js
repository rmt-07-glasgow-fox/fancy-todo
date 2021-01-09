const router = require ("express").Router()
const Controller = require ('../controllers/todo')
const { authorize } = require ('../middlewares/auth')


router.get('/', Controller.todoList)
router.get('/:id', authorize, Controller.pickTodo)

router.post('/', Controller.addTodo)

router.put('/:id', authorize, Controller.editTodo)
router.patch('/:id', authorize, Controller.patchTodo)

router.delete('/:id', authorize, Controller.deleteTodo)

module.exports = router
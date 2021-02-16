const router = require("express").Router()
const todosController = require("../controllers/todosController.js")
const { authorize } = require("../middlewares/authorization")


router.post('/', todosController.createTodo)
router.get('/', todosController.getTodo)

router.use('/:id', authorize)
router.get('/:id', todosController.getTodoById)
router.put('/:id', todosController.editTodo)
router.patch('/:id', todosController.changeStatus)
router.delete('/:id', todosController.deleteTodo)


module.exports = router
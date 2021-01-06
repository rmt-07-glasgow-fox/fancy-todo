const router = require("express").Router()
const controllerTodo = require("../controllers/todo.js")
const { authorize } = require('../middlewares/auth')

router.post('/', controllerTodo.createTodo)
router.get('/', controllerTodo.readTodo)
router.get('/:id', controllerTodo.getTodo)
router.put('/:id', authorize, controllerTodo.putTodo)
router.patch('/:id', authorize, controllerTodo.patchTodo)
router.delete('/:id', authorize, controllerTodo.deleteTodo)

module.exports = router
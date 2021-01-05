const router = require("express").Router()
const controllerTodo = require("../controllers/todo.js")
const { authorize } = require('../middlewares/auth')

router.get('/', controllerTodo.readTodo)
router.post('/', controllerTodo.createTodo)
router.put('/:id', authorize, controllerTodo.updateTodo)
router.delete('/:id', authorize, controllerTodo.deleteTodo)

module.exports = router
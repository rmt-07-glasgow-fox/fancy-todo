const router = require("express").Router()
const {authenticate} = require("../middleware/authenticate")
const authorize = require("../middleware/authorize")
const Controller = require("../controllers/todoController")

router.use(authenticate)

router.post('/', Controller.createTodo)
router.get('/', Controller.getTodos)
router.get('/:id', authorize, Controller.getTodoById)
router.put('/:id', authorize, Controller.updateTodo)
router.patch('/:id', authorize, Controller.updateTodoStatus)
router.delete('/:id', authorize, Controller.deleteTodo)

module.exports = router
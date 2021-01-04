const router = require("express").Router()
const todosController = require("../controllers/todosController.js")


router.post('/todos', todosController.createTodo)
router.get('/todos', todosController.getTodo)
router.get('/todos/:id', todosController.getTodoById)
router.put('/todos/:id', todosController.editTodo)
router.patch('/todos/:id', todosController.changeStatus)


module.exports = router
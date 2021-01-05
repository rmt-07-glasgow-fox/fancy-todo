const router = require('express').Router()
const todoController = require('../controller/todoController')
const Auth = require('../middlewares/auth')


router.get('/todos', todoController.getAllTodo)
router.post('/todos', todoController.createTodo)
router.get('/todos/:id', Auth.authorization, todoController.findOne)
router.put('/todos/:id', Auth.authorization, todoController.updateTodo)
router.patch('/todos/:id', Auth.authorization, todoController.updateTodoStatus)
router.delete('/todos/:id', Auth.authorization, todoController.deleteTodo)

module.exports = router
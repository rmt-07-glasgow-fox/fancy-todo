const router = require('express').Router()
const Todos = require('../controllers/todo-controller.js')

router.get('/todos', Todos.getTodo)
router.post('/todos', Todos.addTodo)
router.get('/todos/:id', Todos.showTodoByid)
router.put('/todos/:id', Todos.updateTodo)
router.patch('/todos/:id', Todos.updateTodoPatch)
router.delete('/todos/:id', Todos.deleteTodo)

module.exports = router

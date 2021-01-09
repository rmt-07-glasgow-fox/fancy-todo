const router = require('express').Router()
const Todos = require('../controllers/todo-controller.js')
const { route } = require('./auth.js')
const { authorize } = require('../middlewares/auth')

// req.user
router.get('/todos', Todos.getTodo)
router.post('/todos', Todos.addTodo)
router.get('/todos/:id', Todos.showTodoByid)
router.put('/todos/:id', Todos.updateTodo)
router.patch('/todos/:id', Todos.updateTodoPatch)
//authorization
router.delete('/todos/:id', authorize, Todos.deleteTodo)

module.exports = router

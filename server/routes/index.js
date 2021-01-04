const routes = require('express').Router()
const ControllerTodo = require('../controllers/todoController')

// routes.get('/', (req, res) => {
//   res.send('Welcome to another hell, enjoy your ride ^_^')
// })

routes.post('/todos', ControllerTodo.addTodo)
routes.get('/todos', ControllerTodo.showAllTodo)
routes.get('/todos/:id', ControllerTodo.showTodoByID)
routes.put('/todos/:id', ControllerTodo.editTodo)
routes.patch('/todos/:id', ControllerTodo.doneTodo)
routes.delete('/todos/:id', ControllerTodo.deleteTodo)

module.exports = routes

const routes = require('express').Router()
const ControllerTodo = require('../controllers/todoController')

routes.post('/', ControllerTodo.addTodo)
routes.get('/', ControllerTodo.showAllTodo)
routes.get('/:id', ControllerTodo.showTodoByID)
routes.put('/:id', ControllerTodo.editTodo)
routes.patch('/:id', ControllerTodo.doneTodo)
routes.delete('/:id', ControllerTodo.deleteTodo)

module.exports = routes

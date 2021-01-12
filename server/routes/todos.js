const routes = require('express').Router()
const ControllerTodo = require('../controllers/todoController')
const { authorize } = require('../middlewares/authorization')

routes.post('/', ControllerTodo.addTodo)
routes.get('/', ControllerTodo.showAllTodo)

// Include authorization for Update,Delete. ReadByID not done
routes.get('/:id', authorize, ControllerTodo.showTodoByID)
routes.put('/:id', authorize, ControllerTodo.editTodo)
routes.patch('/:id', authorize, ControllerTodo.doneTodo)
routes.delete('/:id', authorize, ControllerTodo.deleteTodo)

module.exports = routes

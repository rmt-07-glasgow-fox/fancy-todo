const routes = require('express').Router()
const Controller = require('../controllers/todoController')

// routes.get('/', (req, res) => {
//   res.send('Welcome to another hell, enjoy your ride ^_^')
// })

routes.post('/todos', Controller.addTodo)
routes.get('/todos', Controller.showAllTodo)
routes.get('/todos/:id', Controller.showTodoByID)
routes.put('/todos/:id', Controller.editTodo)
routes.patch('/todos/:id', Controller.doneTodo)
routes.delete('/todos/:id', Controller.deleteTodo)

module.exports = routes

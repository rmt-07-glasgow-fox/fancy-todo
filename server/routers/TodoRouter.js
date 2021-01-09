const todoRoute = require('express').Router()
const TodoController = require('../controllers')
const authen = require('../middlewears/authen')
const author = require('../middlewears/author')

todoRoute.use(authen)
todoRoute.post('/', TodoController.createTodo)
todoRoute.get('', TodoController.getList)
todoRoute.get('/:id', author,TodoController.getTodoById)
todoRoute.put('/:id', author, TodoController.editTodo)
todoRoute.patch('/:id', author, TodoController.changeStatus)
todoRoute.delete('/:id', author, TodoController.deletedTodo)


module.exports = todoRoute
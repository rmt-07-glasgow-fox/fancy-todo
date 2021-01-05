const rout = require('express').Router()
const todoController = require('../controllers/todoController')
const {authorization} = require('../middleware/auth')

rout.post('/',todoController.postTodo)
rout.get('/',todoController.getTodos)
rout.get('/:id',authorization,todoController.getTodosById)
rout.put('/:id',authorization,todoController.putTodo)
rout.patch('/:id',authorization,todoController.patchTodo)
rout.delete('/:id',authorization,todoController.deleteTodo)

module.exports = rout
const rout = require('express').Router()
const todoController = require('../controllers/todoController')

rout.post('/',todoController.postTodo)
rout.get('/',todoController.getTodos)
rout.get('/:id',todoController.getTodosById)
rout.put('/:id',todoController.putTodo)
rout.patch('/:id',todoController.patchTodo)
rout.delete('/:id',todoController.deleteTodo)

module.exports = rout
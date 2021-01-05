const express = require('express');
const todosController = require('../controllers/todosController');
const { authentication, authorization } = require('../middlewares/auth');
const todosRoute = express.Router();

todosRoute.use(authentication);

todosRoute.get('/', todosController.getTodos);
todosRoute.post('/', todosController.postTodos);

todosRoute.use('/:id', authorization);

todosRoute.get('/:id', todosController.getTodoById);
todosRoute.put('/:id', todosController.putTodo);
todosRoute.patch('/:id', todosController.patchTodo);
todosRoute.delete('/:id', todosController.deleteTodo);

module.exports = todosRoute;
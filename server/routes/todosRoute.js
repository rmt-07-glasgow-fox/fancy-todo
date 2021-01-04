const express = require('express');
const todosController = require('../controllers/todosController');
const todosRoute = express.Router();

todosRoute.get('/', todosController.getTodos);
todosRoute.post('/', todosController.postTodos);
todosRoute.get('/:id', todosController.getTodoById);
todosRoute.put('/:id', todosController.putTodo);

module.exports = todosRoute;
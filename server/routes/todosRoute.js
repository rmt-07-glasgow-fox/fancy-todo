const express = require('express');
const todosController = require('../controllers/todosController');
const todosRoute = express.Router();

todosRoute.get('/', todosController.getTodos);
todosRoute.post('/', todosController.postTodos);

module.exports = todosRoute;
const express = require('express');
const todosController = require('../controllers/todosController');
const todosRoute = express.Router();

todosRoute.get('/', todosController.getTodos);

module.exports = todosRoute;
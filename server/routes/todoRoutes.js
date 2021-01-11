const { TodoController, ApiController } = require('../controllers')
const { authorized } = require('../middlewares')
const express = require('express')
const router = express.Router()

router.get('/weather', ApiController.getWeather)
router.get('/', TodoController.getTodos)
router.post('/', TodoController.addTodo)
router.get('/:id', authorized, TodoController.getTodoId)
router.put('/:id', authorized, TodoController.putTodo)
router.patch('/:id', authorized, TodoController.patchTodo)
router.delete('/:id', authorized, TodoController.deleteTodo)

module.exports = router
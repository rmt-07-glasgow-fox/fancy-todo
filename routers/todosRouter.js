var express = require('express')
var router = express.Router()

const todosController = require('../controllers/todosController')
const usersController = require('../controllers/usersController')

// define the route
router.post('/', todosController.createTodos)
router.get('/', todosController.showTodos)
router.get('/:id', todosController.showTodosById)
//need authorized
router.put('/:id', todosController.putTodosById)
router.patch('/:id', todosController.patchTodosById)
router.delete('/:id', todosController.deleteTodosById)

module.exports = router
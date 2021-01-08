var express = require('express')
var router = express.Router()

const { authentication, authorization} = require('../middlewares/auth')

const todosController = require('../controllers/todosController')
const usersController = require('../controllers/usersController')

// define the route

//need authentication
router.use(authentication)
router.get('/', todosController.showTodos)
router.get('/:id', todosController.showTodosById)
router.post('/', todosController.createTodos)
//need authorization
router.put('/:id', authorization, todosController.putTodosById)
router.patch('/:id', authorization, todosController.patchTodosById)
router.delete('/:id', authorization, todosController.deleteTodosById)

module.exports = router
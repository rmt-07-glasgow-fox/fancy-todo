var express = require('express')
var router = express.Router()

const todosController = require('../controllers/todosController')
const usersController = require('../controllers/usersController')


// define the home page route
router.get('/', function (req, res) {
  res.send('<h1>Welcome buddy!</h1>')
})

// define the route
router.post('/todos', todosController.createTodos)
router.get('/todos', todosController.showTodos)
router.get('/todos/:id', todosController.showTodosById)
router.put('/todos/:id', todosController.putTodosById)
router.patch('/todos/:id', todosController.patchTodosById)
router.delete('/todos/:id', todosController.deleteTodosById)

router.post('/register', usersController.register)
router.post('/login', usersController.login)

module.exports = router
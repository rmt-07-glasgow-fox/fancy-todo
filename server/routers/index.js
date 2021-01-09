var express = require('express')
var router = express.Router()

const todosRouter = require('../routers/todosRouter')

const todosController = require('../controllers/todosController')
const usersController = require('../controllers/usersController')


// define the home page route
router.get('/', function (req, res) {
  res.send('<h1>Welcome buddy!</h1>')
})

// define the route
router.post('/register', usersController.register)
router.post('/login', usersController.login)
router.post('/loginGoogle', usersController.loginGoogle)

// todos router
router.use('/todos', todosRouter)

module.exports = router
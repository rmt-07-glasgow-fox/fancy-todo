const router = require('express').Router()
const TodoController = require('../controllers/TodoController')

router.post('/todos', TodoController.createTodo)
router.get('/todos', TodoController.readTodo)

module.exports = router



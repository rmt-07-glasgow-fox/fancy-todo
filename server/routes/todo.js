const express = require('express')
const router = express.Router()
const TodoController = require('../controllers/todoController')
const { authorize } = require('../middleware/auth')

router.get('/', TodoController.getTodo)
router.post('/', TodoController.addTodo)

router.delete('/:id',authorize, TodoController.deleteTodo)
router.put('/:id',authorize, TodoController.editTodo)
router.patch('/:id',authorize, TodoController.editOne)


module.exports = router
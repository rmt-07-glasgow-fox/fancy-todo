const express = require('express')
const router = express.Router()
const TodoController = require('../controllers/todo-controller')
const { authorization } = require('../middlewares/auth')


router.post('/', TodoController.postTodoHandler)
router.get('/', TodoController.getTodoHandler)

router.get('/:id', authorization, TodoController.getTodoIdHandler)
router.put('/:id', authorization, TodoController.putTodoIdHandler)
router.patch('/:id', authorization, TodoController.patchTodoIdHandler)
router.delete('/:id', authorization, TodoController.deleteTodoHandler)

module.exports = router
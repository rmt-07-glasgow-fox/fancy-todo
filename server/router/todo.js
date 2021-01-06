const express = require('express')
const router = express.Router()
const TodoController = require('../controller/todocontroller')
const {authorize} = require('../middleware/auth')

router.get('/', TodoController.showTodo)
router.post('/', TodoController.addTodo)
router.get('/:id', authorize, TodoController.showTodoById)
router.put('/:id', authorize, TodoController.edit)
router.patch('/:id', authorize, TodoController.editStatus)
router.delete('/:id', authorize, TodoController.delete)

module.exports = router
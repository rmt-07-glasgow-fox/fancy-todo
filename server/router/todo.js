const express = require('express')
const router = express.Router()
const TodoController = require('../controller/todocontroller')

router.get('/', TodoController.showTodo)
router.post('/', TodoController.addTodo)
router.get('/:id', TodoController.showTodoById)
router.put('/:id', TodoController.edit)
router.patch('/:id', TodoController.editStatus)
router.delete('/:id', TodoController.delete)

module.exports = router
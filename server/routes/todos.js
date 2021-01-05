const router = require('express').Router()

const Controller = require('../controllers/todoController')

router.get('/', Controller.getTodo)

router.post('/', Controller.createTodo)

router.get('/:id', Controller.findTodoById)

router.put('/:id', Controller.editTodo)

router.patch('/:id', Controller.editStatusTodo)

router.delete('/:id', Controller.deleteTodoById)


module.exports = router
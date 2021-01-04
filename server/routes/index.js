const router = require('express').Router()
const Controller = require('../controllers/controller')

router.get('/todos', Controller.getTodo)

router.post('/todos', Controller.createTodo)

router.get('/todos/:id', Controller.findTodoById)

router.put('/todos/:id', Controller.editTodo)

router.patch('/todos/:id', Controller.editStatusTodo)

router.delete('/todos/:id', Controller.deleteTodoById)


module.exports = router
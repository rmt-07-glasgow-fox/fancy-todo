const express = require('express')
const router = express.Router()
const Controller = require('../controllers/todoListController')

router.post('/todos', Controller.newTodos)
router.get('/todos', Controller.allTodos)
router.get('/todos/:id', Controller.findTodoById)
router.put('/todos/:id', Controller.updateTodo)
router.patch('/todos/:id', Controller.editStatusTodo)
router.delete('/todos/:id', Controller.deleteTodo)

module.exports = router
const express = require('express')
const router = express.Router()
const Controller = require('../controllers/todoListController')
const {authorization} = require('../midedlewares/auth')

router.post('/todos', Controller.newTodos)
router.get('/todos', Controller.allTodos)

router.get('/todos/:id',authorization, Controller.findTodoById)
router.put('/todos/:id',authorization, Controller.updateTodo)
router.patch('/todos/:id',authorization, Controller.editStatusTodo)
router.delete('/todos/:id', authorization, Controller.deleteTodo)

module.exports = router
const router = require('express').Router()
const Controller = require('../controllers/todoController')

router.get('/home', Controller.home)

router.post('/todos', Controller.postTodo)

router.get('/todos', Controller.todoShow)

router.get('/todos/:id', Controller.todoById)

router.put('/todos/:id', Controller.updateTodo)

router.patch('/todos/:id', Controller.editSpecify)

router.delete('/todos/:id', Controller.deleteTodo)


module.exports = router
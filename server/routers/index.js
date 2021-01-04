const router = require('express').Router()
const Controller = require('../controllers')

router.post('/todos', Controller.createTodo)
router.get('/todos', Controller.getList)
router.get('/todos/:id', Controller.getTodoById)
router.put('/todos/:id', Controller.editTodo)
router.patch('/todos/:id', Controller.changeStatus)
router.delete('/todos/:id', Controller.deletedTodo)

module.exports = router
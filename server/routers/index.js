const router = require('express').Router()
const Controller = require('../controllers')

router.get('/', Controller.home)
router.get('/todos', Controller.todoList)
router.post('/todos', Controller.todoAdd)
router.get('/todos/:id', Controller.todoById)
router.put('/todos/:id', Controller.todoUpdateAll)
router.patch('/todos/:id', Controller.todoUpdateStatus)
router.delete('/todos/:id', Controller.todoDelete)

module.exports = router
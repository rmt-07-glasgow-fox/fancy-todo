const router = require('express').Router()
const Controller = require('../controllers')

router.get('/', Controller.home)
router.get('/todos', Controller.todoList)
router.post('/todos', Controller.todoAdd)
router.get('/todos/:id', Controller.todoById)

module.exports = router
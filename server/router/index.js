const router = require('express').Router()
const Controller = require('../controllers/todoController')

router.get('/home', Controller.home)

router.post('/todos', Controller.postTodo)


module.exports = router
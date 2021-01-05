const express = require('express')
const router = express.Router()
const TodoController = require('../controllers/todoController')
const UserController = require('../controllers/userController')

router.get('/', (req, res) => {
    res.send('Hello World!')
})

router.get('/todos', TodoController.getTodo)
router.post('/todos', TodoController.addTodo)
router.delete('/todos/:id', TodoController.deleteTodo)
router.put('/todo/:id', TodoController.editTodo)
router.patch('/todo/:id', TodoController.editTodo)

router.post('/signup', UserController.addNew)
router.post('/signin', UserController.login)

module.exports = router
const router = require('express').Router()
const todoController = require('../controller/todoController')

router.get('/welcome', (req, res)=> {
    res.send('Hello World')
})

router.get('/todos', todoController.getAllTodo)
router.post('/todos', todoController.createTodo)
router.get('/todos/:id', todoController.findOne)
router.put('/todos/:id', todoController.updateTodo)
router.patch('/todos/:id', todoController.updateTodoStatus)
router.delete('/todos/:id', todoController.deleteTodo)

module.exports = router
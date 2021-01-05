const express = require('express')
const router = express.Router()
const TodoController = require('../controllers/todoController')

router.get('/', (req, res) => {
    res.send('Hello World!')
})

router.get('/todos', TodoController.getTodo)
router.post('/todos', TodoController.addTodo)
router.delete('/todos/:id', TodoController.deleteTodo)
router.put('/todo/:id', TodoController.editTodo)

module.exports = router
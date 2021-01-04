const router = require('express').Router()
const todoController = require('../controllers/todoController')

router.get('/', (req, res) => {
  res.send('ini home')
})

router.post('/todos', todoController.postTodo)
router.get('/todos', todoController.getTodo)

router.get('/todos/:id', todoController.getTodoById)

router.put('/todos/:id', todoController.putTodo)
router.patch('/todos/:id', todoController.patchTodo)
router.delete('/todos/:id', todoController.deleteTodo)


module.exports = router
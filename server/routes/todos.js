const router = require('express').Router()

const Todos = require('../controllers/todo-controller.js')

router.get('/', Todos.getTodo)
router.post('/', Todos.addTodo)
router.get('/:id', Todos.showTodoByid)
router.put('/:id', Todos.updateTodo)
router.patch('/:id', Todos.updateTodoPatch)
router.delete('/:id', Todos.deleteTodo)


module.exports = router
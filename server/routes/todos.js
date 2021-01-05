const router = require('express').Router()
const { authorization } = require('../middlewares/authenticate')
const Controller = require('../controllers/todoController')

router.get('/',  Controller.getTodo)

router.post('/', Controller.createTodo)

router.get('/:id', authorization, Controller.findTodoById)

router.put('/:id', authorization, Controller.editTodo)

router.patch('/:id', authorization, Controller.editStatusTodo)

router.delete('/:id', authorization, Controller.deleteTodoById)


module.exports = router
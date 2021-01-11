const router = require('express').Router()
const Controller = require('../controllers/todoController')
const {authorization} = require('../middlewares/auth')

router.post('/', Controller.postTodo)

router.get('/', Controller.todoShow)

router.get('/:id',authorization, Controller.todoById)

router.put('/:id',authorization, Controller.updateTodo)

router.patch('/:id',authorization, Controller.editSpecify)

router.delete('/:id',authorization, Controller.deleteTodo)


module.exports = router
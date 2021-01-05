const router = require('express').Router()

const Controller = require('../controller/todoController.js')

router.post('/', Controller.createTodo)
router.get('/', Controller.readList)
router.get('/:id', Controller.getTodo)
router.put('/:id', Controller.editTodo)
router.patch('/:id', Controller.editStatus)
router.delete('/:id', Controller.deleteTodo)

module.exports = router
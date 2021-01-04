const Controller = require('../controllers/Controller')
const express = require('express')
const router = express.Router()

router.get('/', Controller.getTodos)
router.post('/', Controller.addTodo)
router.get('/:id', Controller.getTodoId)
router.put('/:id', Controller.putTodo)
router.patch('/:id', Controller.patchTodo)
router.delete('/:id', Controller.deleteTodo)

module.exports = router
const router = require('express').Router()
const {Controller} = require('../controllers/controllers')

router.get('/todos', Controller.findTodos)
router.post('/todos', Controller.addTodos)
router.get('/todos/:id', Controller.findTodoById)
router.put('/todos/:id', Controller.update)
router.patch('/todos/:id', Controller.editStatus)
router.delete('/todos/:id', Controller.delete)


module.exports = router
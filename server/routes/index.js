const router = require('express').Router()
const Controller = require('../controllers/controller')

router.get('/', Controller.index)
router.post('/todos', Controller.createToDo)
router.get('/todos', Controller.showToDos)
router.get('/todos/:id', Controller.showToDoById)
router.put('/todos/:id', Controller.editToDo)
router.patch('/todos/:id', Controller.patchStatus)
router.delete('/todos/:id', Controller.deleteToDo)

module.exports = router

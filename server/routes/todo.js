const router = require('express').Router()
const Controller = require('../controllers/todoController')

router.post('/', Controller.createToDo)
router.get('/', Controller.getAllToDos)
router.get('/:id', Controller.getToDo)
router.put('/:id', Controller.updateToDo)
router.patch('/:id', Controller.modifyToDo)
router.delete('/:id', Controller.deleteToDo)

module.exports = router
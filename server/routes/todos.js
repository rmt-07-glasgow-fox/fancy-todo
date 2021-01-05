const TodosController = require('../controllers/controller')
const router = require('express').Router();

router.post('/', TodosController.saveTodos)
router.get('/', TodosController.showTodos)
router.get('/:id', TodosController.showTodosById)
router.put('/:id', TodosController.updateTodos)
router.patch('/:id', TodosController.patchTodos)
router.delete('/:id', TodosController.deleteTodos)

module.exports = router
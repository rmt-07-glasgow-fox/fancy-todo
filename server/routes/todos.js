const TodosController = require('../controllers/controller')
const router = require('express').Router();

router.post('/', TodosController.saveTodos)
router.get('/', TodosController.showTodos)
router.get('/:id', TodosController.showTodosById)
router.delete('/:id', TodosController.deleteTodos)

module.exports = router
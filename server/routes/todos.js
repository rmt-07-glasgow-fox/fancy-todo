const router = require('express').Router();
const TodosController = require('../controllers/controller')
const {authorization} = require('../middlewares/middlewares')

router.post('/', TodosController.saveTodos)
router.get('/', TodosController.showTodos)
router.get('/:id', authorization, TodosController.showTodosById)
router.put('/:id', authorization, TodosController.updateTodos)
router.patch('/:id', authorization, TodosController.patchTodos)
router.delete('/:id', authorization, TodosController.deleteTodos)

module.exports = router
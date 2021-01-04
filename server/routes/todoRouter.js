const router = require('express').Router()
const TodoController = require('../controllers/TodoController')

router.get('/', TodoController.getTodos)
router.post('/', TodoController.postTodos)
router.get('/:id', TodoController.getCurrentTodos)
router.put('/:id', TodoController.putUpdateTodos)
router.patch('/:id', TodoController.patchUpdateTodos)
router.delete('/:id', TodoController.deleteTodos)

module.exports = router

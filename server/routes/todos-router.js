const router = require('express').Router();
const TodoController = require('../controllers/todos-controller');

router.get('/', TodoController.todosGet);
router.post('/', TodoController.todosPost);
router.get('/:id', TodoController.todoGet);
router.put('/:id', TodoController.todoPut);
router.patch('/:id', TodoController.todoPatch);
router.delete('/:id', TodoController.todoDelete);

module.exports = router;
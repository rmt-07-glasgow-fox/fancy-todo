const router = require('express').Router();
const TodoController = require('../controllers/TodoController');

router.get('/', TodoController.getTodos);
router.post('/', TodoController.addTodo);

router.get('/:id', TodoController.getTodo);
router.put('/:id', TodoController.editTodo);

router.patch('/:id', TodoController.editStatusTodo);
router.delete('/:id', TodoController.deleteTodo)

module.exports = router; 
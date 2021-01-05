const router = require('express').Router();
const TodoController = require('../controllers/todoController.js');

router.post('/', TodoController.postTodo);
router.get('/', TodoController.getTodo);

router.get('/:id', TodoController.getDetailTodo);
router.put('/:id', TodoController.updateTodo);
router.patch('/:id', TodoController.markTodo);
router.delete('/:id', TodoController.deleteTodo);

module.exports = router;
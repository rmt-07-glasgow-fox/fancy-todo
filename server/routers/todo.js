const router = require('express').Router();
const {
  TodoController
} = require('../controllers');
const {
  authorization
} = require('../middlewares/auth');

router.post('/', TodoController.postCreateTodo);
router.get('/', TodoController.getTodos);

router.get('/:id', authorization, TodoController.getTodoId);
router.put('/:id', authorization, TodoController.editTodo)
router.patch('/:id', authorization, TodoController.updateTodo)
router.delete('/:id', authorization, TodoController.deleteTodo)

module.exports = router;
const router = require('express').Router();
const TodoController = require('../controllers/todoController.js');
const { authorize } = require('../middlewares/auth.js');

router.post('/', TodoController.postTodo);
router.get('/', TodoController.getTodo);

router.get('/:id', authorize, TodoController.getDetailTodo);
router.put('/:id', authorize, TodoController.updateTodo);
router.patch('/:id', authorize, TodoController.markTodo);
router.delete('/:id', authorize, TodoController.deleteTodo);

module.exports = router;
const TodoController = require('../controllers/todoController');
const router = require('express').Router();
const { authorize } = require('../middlewares/auth.js');

router.post('/', TodoController.createTodo);
router.get('/', TodoController.getAllTodo);
router.get('/:id', authorize, TodoController.getTodoById);
router.put('/:id', authorize, TodoController.updateTodo);
router.patch('/:id', authorize, TodoController.updateStatTodo);
router.delete('/:id', authorize, TodoController.deleteTodo);


module.exports = router;
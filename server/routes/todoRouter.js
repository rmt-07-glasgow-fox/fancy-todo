const router = require('express').Router();
const TodoController = require('../controllers/TodoController');
const { authorize } = require('../middlewares/auth') 

router.get('/', TodoController.getTodos);
router.post('/', TodoController.addTodo);

router.get('/:id',authorize, TodoController.getTodo);
router.put('/:id', authorize, TodoController.editTodo);

router.patch('/:id', authorize, TodoController.editStatusTodo);
router.delete('/:id', authorize, TodoController.deleteTodo);

module.exports = router; 

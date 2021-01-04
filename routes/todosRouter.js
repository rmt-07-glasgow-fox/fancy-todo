const TodoController = require('../controllers/todoController');
const router = require('express').Router();

router.post('/', TodoController.createTodo);
router.get('/', TodoController.getAllTodo);
router.get('/:id', TodoController.getTodoById);
router.put('/:id', TodoController.updateTodo);
router.patch('/:id', TodoController.updateStatTodo);
router.delete('/:id', TodoController.deleteTodo);


module.exports = router;
const TodoController = require('../controllers/todoController');

const router = require('express').Router();

router.post('/todos', TodoController.createTodo);
router.get('/todos', TodoController.getAllTodo);
router.get('/todos/:id', TodoController.getTodoById);
router.put('/todos/:id', TodoController.updateTodo);
router.patch('/todos/:id', TodoController.updateStatTodo);
router.delete('/todos/:id', TodoController.deleteTodo);





module.exports = router;
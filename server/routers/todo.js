const router = require('express').Router();
const TodoController = require('../controllers/todoController.js');

router.post('/todos', TodoController.postTodo);
router.get('/todos', TodoController.getTodo);

router.get('/todos/:id', TodoController.getDetailTodo);
router.put('/todos/:id', TodoController.updateTodo);
router.patch('/todos/:id', TodoController.markTodo);
router.delete('/todos/:id', TodoController.deleteTodo);

module.exports = router;
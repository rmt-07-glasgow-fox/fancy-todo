const router = require('express').Router();
const todosController = require('../controllers/todosController.js');

router.post('/todos', todosController.postTodos);
router.get('/todos', todosController.getTodos);

router.get('/todos/:id', todosController.getDetailTodos);
router.put('/todos/:id', todosController.updateTodos);
router.patch('/todos/:id', todosController.markTodos);
router.delete('/todos/:id', todosController.deleteTodos);

module.exports = router;
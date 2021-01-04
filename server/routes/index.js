const express = require('express');
const router = express.Router();
const Controller = require('../controllers/todoController.js');

router.get('/todos', Controller.getAllTodoHandler);
router.get('/todos/:id', Controller.getOneTodoHandler);
router.put('/todos/:id', Controller.putTodoHandler);
router.patch('/todos/:id', Controller.patchTodoHandler);
router.post('/todos', Controller.postTodoHandler);

module.exports = router;
const express = require('express');
const router = express.Router();
const Controller = require('../controllers/todoController.js');

router.get('/todos', Controller.getTodoHandler);
router.post('/todos', Controller.postTodoHandler);

module.exports = router;
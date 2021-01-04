const todoController = require('../controllers/todoController');

const router = require('express').Router();

router.post('/todos', todoController.createTodo);

module.exports = router;
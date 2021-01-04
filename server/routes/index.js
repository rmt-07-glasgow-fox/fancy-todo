const express = require('express');
const router = express.Router();
const Controller = require('../controllers/todoController.js');
const authRouter = require('./auth.js');

router.use('/', authRouter);

router.get('/todos', Controller.getAllTodoHandler);
router.get('/todos/:id', Controller.getOneTodoHandler);
router.put('/todos/:id', Controller.putTodoHandler);
router.patch('/todos/:id', Controller.patchTodoHandler);
router.delete('/todos/:id', Controller.deleteTodoHandler);
router.post('/todos', Controller.postTodoHandler);

module.exports = router;
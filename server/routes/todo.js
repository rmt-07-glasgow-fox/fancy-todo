const express = require('express');
const router = express.Router();
const Controller = require('../controllers/todoController.js');

router.get('/', Controller.getAllTodoHandler);
router.get('/:id', Controller.getOneTodoHandler);
router.put('/:id', Controller.putTodoHandler);
router.patch('/:id', Controller.patchTodoHandler);
router.delete('/:id', Controller.deleteTodoHandler);
router.post('/', Controller.postTodoHandler);

module.exports = router;
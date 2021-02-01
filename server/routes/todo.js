const express = require('express');
const router = express.Router();
const Controller = require('../controllers/todoController.js');
const { authorize } = require('../middlewares/auth.js');

router.get('/', Controller.getAllTodoHandler);
router.post('/', Controller.postTodoHandler);
router.get('/:id', authorize, Controller.getOneTodoHandler);
router.put('/:id', authorize, Controller.putTodoHandler);
router.patch('/:id', authorize, Controller.patchTodoHandler);
router.delete('/:id', authorize, Controller.deleteTodoHandler);

module.exports = router;
const router = require('express').Router();
const TodoController = require('../controllers/todos-controller');
const { authorize } = require('../middlewares/auth')

router.get('/', TodoController.todosGet);
router.post('/', TodoController.todosPost);
router.get('/:id', authorize, TodoController.todoGet);
router.put('/:id', authorize, TodoController.todoPut);
router.patch('/:id', authorize, TodoController.todoPatch);
router.delete('/:id', authorize, TodoController.todoDelete);

module.exports = router;
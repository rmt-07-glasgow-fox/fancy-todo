const router = require('express').Router();
const todoController = require('../controllers/todoController')

router.get('/', todoController.showAll);

router.post('/', todoController.add);

router.get('/:id', todoController.showOne);

router.put('/:id', todoController.edit);

router.patch('/:id', todoController.editStatus);

router.delete('/:id', todoController.delete);

module.exports = router
const router = require('express').Router();
const todoController = require('../controllers/todoController');

router.get('/', todoController.getAll);
router.get('/:id', todoController.get);
router.post('/', todoController.store);
router.put('/:id', todoController.update);
router.patch('/:id', todoController.updateStatus);
router.delete('/:id', todoController.destroy)



module.exports = router;
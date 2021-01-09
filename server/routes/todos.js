const router = require('express').Router();
const todoController = require('../controllers/todoController');
const isAuthorize = require('../middlewares/isAuthorize')

router.get('/', todoController.getAll);
router.get('/movies/popular', todoController.getAllMovie);
router.post('/', todoController.store);
router.get('/:id', isAuthorize, todoController.get);
router.put('/:id', isAuthorize, todoController.update);
router.patch('/:id', isAuthorize, todoController.updateStatus);
router.delete('/:id', isAuthorize, todoController.destroy)



module.exports = router;
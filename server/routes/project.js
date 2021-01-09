const router = require('express').Router();
const projectController = require('../controllers/projectController');
const isAuthorize = require('../middlewares/isAuthorize')

router.get('/', projectController.getAll);
router.post('/', projectController.store);
router.put('/:id', isAuthorize, projectController.update);
router.delete('/:id', isAuthorize, projectController.destroy);



module.exports = router;
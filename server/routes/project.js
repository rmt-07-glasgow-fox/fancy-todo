const router = require('express').Router();
const projectController = require('../controllers/projectController');
const isAuthorize = require('../middlewares/isAuthorize')

router.get('/', projectController.getAll);
router.get('/select2user', projectController.getSelect2UserDetail);
router.get('/:id', projectController.get);
router.get('/:id/user', projectController.getUserDetail);
router.post('/', projectController.store);
router.post('/user', projectController.storeUserProject);
router.put('/:id', isAuthorize, projectController.update);
router.patch('/:id', isAuthorize, projectController.updateStatus);
router.delete('/:id', isAuthorize, projectController.destroy);
router.delete('/:id/user/:userId', isAuthorize, projectController.destroyUserDetail);




module.exports = router;
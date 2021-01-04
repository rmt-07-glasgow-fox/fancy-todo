const router = require('express').Router();
const UserController = require('../controllers/users-controller');

router.post('/', UserController.registerPost);
router.get('/login', UserController.loginGet);
router.post('/login', UserController.loginPost);
router.get('/logout', UserController.logout);

module.exports = router;
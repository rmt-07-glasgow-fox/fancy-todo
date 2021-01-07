const router = require('express').Router();
const UserController = require('../controllers/UserController');

router.get('/users', UserController.getUsers)
router.post('/login', UserController.login);
router.post('/google-login', UserController.googleLogin)
router.post('/register', UserController.addNewUser);

module.exports = router;
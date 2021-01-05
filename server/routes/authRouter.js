const router = require('express').Router();
const UserController = require('../controllers/UserController');

router.get('/users', UserController.getUsers)

// router.get('/register', UserController.register);
router.get('/login', UserController.login);
router.post('/register', UserController.addNewUser);

module.exports = router;
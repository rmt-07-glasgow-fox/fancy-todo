const router = require('express').Router();
const UserController = require('../controllers/users-controller');

router.post('/register', UserController.registerPost);
router.post('/login', UserController.loginPost);
router.post('/loginGoogle', UserController.loginGoogle);

module.exports = router;
const router = require('express').Router();
const UsersController = require('../controllers/userController')

router.post('/register', UsersController.registerUser)
router.post('/login', UsersController.loginUser)
router.post('/loginGoogle', UsersController.loginGoogle)


module.exports = router
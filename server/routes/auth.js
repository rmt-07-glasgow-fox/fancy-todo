const router = require('express').Router();
const UsersController = require('../controllers/userController')

router.post('/register', UsersController.registerUser)
router.post('/login', UsersController.loginUser)


module.exports = router
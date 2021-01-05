const UsersController = require('../controllers/userController')
const router = require('express').Router();

router.post('/register', UsersController.registerUser)
router.post('/login', UsersController.loginUser)


module.exports = router
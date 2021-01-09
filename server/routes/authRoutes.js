const router = require('express').Router()
const UserController = require('../controllers/UserController')

router.post('/register', UserController.userRegister)
router.post('/login', UserController.userLogin)
router.post('/googleLogin', UserController.userGoogleLogin)

module.exports = router
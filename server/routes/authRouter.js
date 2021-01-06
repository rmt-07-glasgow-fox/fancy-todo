const express = require('express')
const UserController = require('../controllers/user_controller')
const router = express.Router()

router.post('/signin', UserController.signin)
router.post('/signup', UserController.signup)

router.post('/googleSignin', UserController.googleSignin)

module.exports = router
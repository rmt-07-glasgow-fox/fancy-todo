const express = require('express')
const router = express.Router()
const AuthController = require('../controller/authcontroller')


router.post('/register', AuthController.register)
router.post('/googleLogin',  AuthController.googleLogin)
router.post('/login', AuthController.login)

module.exports = router
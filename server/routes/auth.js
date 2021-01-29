const express = require('express')
const router = express.Router()
const UserController = require('../controllers/userController')

router.post('/signup', UserController.addNew)
router.post('/signin', UserController.login)
router.post('/signinGoogle', UserController.loginGoogle)

module.exports = router
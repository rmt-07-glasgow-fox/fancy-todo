const express = require('express')
const router = express.Router()
const UserController = require('../controllers/userController')

router.post("/signup",UserController.signUp)
router.post("/signin",UserController.signIn)
router.post('/loginGoogle',UserController.loginGoogle)


module.exports = router
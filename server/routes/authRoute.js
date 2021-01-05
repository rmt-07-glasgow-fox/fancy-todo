const express = require('express')
const router = express.Router()
const UserController = require('../controllers/userController')

router.post("/",UserController.signUp)
router.post("/signIn",UserController.signIn)


module.exports = router
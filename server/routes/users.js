const express = require('express')
const router = express.Router()
const ControllerUser = require('../controllers/controllerUser')
const emailValidation = require('../middleware/emailValidation')



router.post("/register", emailValidation, ControllerUser.register)
router.post("/login", ControllerUser.login)

module.exports = router
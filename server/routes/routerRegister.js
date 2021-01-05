const router = require('express').Router()
const userController = require('../controller/userController')

router.get('/register', userController.register)
router.get('/login', userController.login)

module.exports = router 
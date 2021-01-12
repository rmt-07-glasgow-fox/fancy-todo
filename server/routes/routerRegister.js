const router = require('express').Router()
const userController = require('../controller/userController')

router.post('/user/register', userController.register)
router.post('/user/login', userController.login)
router.post('/user/loginGoogle', userController.loginGoogle)


module.exports = router 
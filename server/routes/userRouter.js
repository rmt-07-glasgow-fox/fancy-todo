const router = require('express').Router()

const UserController = require('../controller/userController')

router.get('/user', UserController.getUser)

router.get('/news', UserController.newsWidget)
router.post('/login', UserController.login)

router.post('/googleLogin', UserController.googleLogin)

router.post('/register', UserController.register)




module.exports = router
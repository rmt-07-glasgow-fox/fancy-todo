const router = require('express').Router()

const Controller = require('../controller/userController')

router.get('/user', Controller.getUser)

router.get('/news', Controller.newsWidget)
router.post('/login', Controller.login)

router.post('/googleLogin',Controller.googleLogin)

router.post('/register', Controller.register)




module.exports = router
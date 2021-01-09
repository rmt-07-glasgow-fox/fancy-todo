const UserController = require('../controllers/userController')
const router = require('express').Router()

router.post('/login',UserController.login)
router.post('/register',UserController.register)
router.post('/googleSign',UserController.googleSign)

module.exports = router

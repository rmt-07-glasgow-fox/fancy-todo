const router = require('express').Router()
const UserController = require('../controllers/userController')

router.post('/signup', UserController.signup)
router.get('/login', UserController.login)

module.exports = router
const router = require('express').Router()
const AuthController = require('../controllers/authController.js')

router.get('/register', AuthController.getRegister)
router.post('/register', AuthController.postRegister)
router.delete('/register/:id', AuthController.removeRegister)
router.post('/login', AuthController.postLogin)

module.exports = router
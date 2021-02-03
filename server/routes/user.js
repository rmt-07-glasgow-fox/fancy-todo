const router = require('express').Router();
const userController = require('../controllers/userController')

router.post('/signUp', userController.register);

router.post('/signIn', userController.login)

router.post('/signInGoogle', userController.signInGoogle)

module.exports = router
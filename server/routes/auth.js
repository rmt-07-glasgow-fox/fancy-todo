const express = require('express');
const router = express.Router();
const Controller = require('../controllers/userController.js');

router.post('/register', Controller.registerHandler);
router.post('/login', Controller.loginHandler);
router.post('/googleLogin', Controller.userGoogleLogin)

module.exports = router;
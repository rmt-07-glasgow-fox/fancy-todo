const express = require('express');
const authController = require('../controllers/authController');
const authRoute = express.Router();

authRoute.post('/signUp', authController.postSignUp);
authRoute.post('/signIn', authController.postSignIn);

module.exports = authRoute;
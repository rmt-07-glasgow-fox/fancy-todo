const express = require('express');
const router = express.Router();

const { login, register, googleLogin } = require('../controllers/user');

router.post('/register', register);
router.post('/login', login);
router.post('/google', googleLogin);

module.exports = router;

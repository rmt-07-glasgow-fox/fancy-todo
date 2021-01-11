const router = require('express').Router();
const authContoller = require('../controllers/authContoller');

router.post('/register', authContoller.register);
router.post('/login', authContoller.login);
router.post('/loginGoogle', authContoller.loginGoogle);


module.exports = router;
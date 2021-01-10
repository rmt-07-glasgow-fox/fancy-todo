const router = require('express').Router();
const UserController = require('../controllers/userController.js');


router.get('/', UserController.getQuote);

module.exports = router;
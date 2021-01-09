const router = require('express').Router()
const UserController = require('../controllers/userController')

router.post('/signup', UserController.signup)
router.post('/signin', UserController.login)
router.post("/googleLogin", UserController.googleLogin);

//IHDkuHF-UakL25HYZUiZsoae
module.exports = router
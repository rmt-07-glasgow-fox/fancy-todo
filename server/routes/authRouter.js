const router = require("express").Router()
const userController = require("../controllers/usersController")


router.post('/signup', userController.signUp)
router.post('/signin', userController.signIn)

module.exports = router
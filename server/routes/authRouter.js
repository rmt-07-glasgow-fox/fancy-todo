const router = require("express").Router()
const userController = require("../controllers/usersController")


router.post('/signUp', userController.signUp)
router.post('/signIn', userController.signIn)

module.exports = router
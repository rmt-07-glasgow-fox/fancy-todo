const router = require("express").Router()
const userController = require("../controllers/userController")

router.post("/signUp", userController.signUp)
router.post("/signIn", userController.signIn)
router.post("/loginGoogle", userController.loginGoogle)

module.exports = router
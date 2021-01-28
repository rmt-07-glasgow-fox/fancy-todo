const router = require('express').Router()
const Authentication = require("../controllers/authController")

router.post("/signUp", Authentication.signUp)
router.post("/signIn", Authentication.signIn)

module.exports = router
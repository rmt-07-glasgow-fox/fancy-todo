const router = require('express').Router()
const ControllerUser = require("../controllers/user") 

router.post("/loginGoogle", ControllerUser.loginGoogle)
router.post("/register", ControllerUser.register)
router.post("/login", ControllerUser.login)
router.get("/user", ControllerUser.findUser)


module.exports = router

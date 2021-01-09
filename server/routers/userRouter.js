const router = require("express").Router()
const Controller = require("../controllers/userController.js")

router.post('/login', Controller.login)
router.post('/register', Controller.register)

module.exports = router
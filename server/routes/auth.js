const router = require("express").Router()
const controllerAuth = require("../controllers/auth.js")

router.use('/', controllerAuth.register)
router.use('/login', controllerAuth.login)

module.exports = router
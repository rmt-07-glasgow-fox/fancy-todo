const router = require("express").Router()
const controllerUser = require("../controllers/user.js")

router.get('/', controllerUser.weather)
router.post('/signup', controllerUser.signup)
router.post('/signin', controllerUser.signin)

module.exports = router
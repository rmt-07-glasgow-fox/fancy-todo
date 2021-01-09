const router = require("express").Router()
const controllerUser = require("../controllers/user.js")

router.get('/weather', controllerUser.weather)
router.post('/signup', controllerUser.signup)
router.post('/signin', controllerUser.signin)
router.post('/loginGoogle', controllerUser.loginGoogle)

module.exports = router
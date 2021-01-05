const UserController = require('../controllers/UserController')
const router = require ('express').Router()

router.post ("/signUp", UserController.signUp)

router.post ("/signIn", UserController.signIn)

module.exports = router
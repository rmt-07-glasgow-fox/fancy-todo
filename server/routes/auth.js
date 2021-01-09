const router = require('express').Router()
const Controller = require('../controllers/authController')

router.post('/signUp', Controller.signUp)
router.post('/signIn', Controller.signIn)
router.post('/loginGoogle', Controller.loginGoogle)


module.exports = router
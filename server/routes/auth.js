const router = require('express').Router()
const Controller = require('../controllers/authController')

router.post('/signUp', Controller.signUp)
router.post('/signIn', Controller.signIn)

module.exports = router
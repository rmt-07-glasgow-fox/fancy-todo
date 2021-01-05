const router = require('express').Router()
const Controller = require('../controllers/authController')

router.post('/register', Controller.register)

router.post('/login', Controller.login)

module.exports = router
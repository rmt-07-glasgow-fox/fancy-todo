const Controller = require('../controllers/user')
const router = require ('express').Router()

router.post ('/register', Controller.register)

router.post ('/login', Controller.login)

router.post('/loginGoogle', Controller.loginGoogle)

module.exports = router
const router = require('express').Router()

const Users = require('../controllers/user-controller.js')


router.post('/login', Users.login)
router.post('/register', Users.register)
router.post('/login/google', Users.loginGoogle)



module.exports = router

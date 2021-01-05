const router = require('express').Router()

const Users = require('../controllers/user-controller.js')


router.post('/register', Users.register)
router.post('/login', Users.login)


module.exports = router

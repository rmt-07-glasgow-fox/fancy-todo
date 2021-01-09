const express = require('express')
const router = express.Router()
const UserController = require('../controllers/userController')

router.post('/signup', UserController.addNew)
router.post('/login', UserController.login)

module.exports = router
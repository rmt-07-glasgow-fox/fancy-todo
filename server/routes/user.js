const router = require('express').Router()

const userController = require('../controllers/userController')

router.get('/', userController.showUser)

module.exports = router
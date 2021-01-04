const express = require('express')
const router = express.Router()
const todos = require('./todos')
const ControllerUser = require('../controllers/controllerUser')


router.use("/todos",todos)
router.post("/register",ControllerUser.register)
router.post("/login",ControllerUser.login)


module.exports = router
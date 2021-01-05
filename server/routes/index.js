const express = require("express")
const router = express.Router()
const todoRoute = require("./todoRoute")
const user = require("./user")
const {authentication} = require("../middlewares/auth")


router.use(user)
router.use(authentication)
router.use("/todos", todoRoute)

module.exports = router
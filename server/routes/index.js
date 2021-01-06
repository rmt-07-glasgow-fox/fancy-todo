const express = require("express")
const router = express.Router()
const todoRoute = require("./todoRoute")
const user = require("./user")
const food = require("./food")
const {authentication} = require("../middlewares/auth")


router.use(user)
router.use(authentication)
router.use("/food", food)
router.use("/todos", todoRoute)

module.exports = router
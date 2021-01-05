const express = require("express")
const router = express.Router()
const todoRoute = require("./todoRoute")
const user = require("./user")

router.use(user)
router.use("/todos", todoRoute)

module.exports = router
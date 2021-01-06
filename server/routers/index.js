const router = require('express').Router()
const auth = require("./auth")
const todoList = require("./todoList")
const { authentication } = require("../middlewares/auth")

router.get("/", (req, res) => {
  res.send(`Hello`)
})

router.use("/", auth)

router.use("/", authentication, todoList)

module.exports = router
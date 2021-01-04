const router = require("express").Router()
const todoRouter = require("./todoRoutes")
const authRouter = require("./authRoutes")

router.use(authRouter)
router.use("/todos", todoRouter)

module.exports = router
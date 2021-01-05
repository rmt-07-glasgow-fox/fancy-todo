const router = require("express").Router()
const todoRouter = require("./todoRoutes")
const authRouter = require("./authRoutes")
const {
  authentication
} = require("../middlewares/middleware")

router.use(authRouter)
router.use(authentication)
router.use("/todos", todoRouter)

module.exports = router
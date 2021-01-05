const router = require("express").Router()
const todoRouter = require("./todoRoutes")
const authRouter = require("./authRoutes")
const covidApiRouter = require("./covidApiRouter")
const {
  authentication
} = require("../middlewares/middleware")

router.use("/covid", covidApiRouter)
router.use(authRouter)
router.use(authentication)
router.use("/todos", todoRouter)

module.exports = router
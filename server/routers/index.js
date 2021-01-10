const router = require("express").Router()
const userRouter = require("./userRouter")
const todoRouter = require("./todoRouter")

router.use('/api/users', userRouter)
router.use('/api/todos', todoRouter)

module.exports = router
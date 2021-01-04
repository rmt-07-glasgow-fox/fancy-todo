const router = require("express").Router()
const todosRouter = require("../routes/todosRouter")
const authRouter = require("./authRouter.js")

router.use('/todos', todosRouter)
router.use(authRouter)


module.exports = router
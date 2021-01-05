const router = require("express").Router()
const todosRouter = require("../routes/todosRouter")
const authRouter = require("./authRouter.js")
const isLogin = require("../middlewares/authentication.js")


router.use(authRouter)
router.use(isLogin)
router.use('/todos', todosRouter)


module.exports = router
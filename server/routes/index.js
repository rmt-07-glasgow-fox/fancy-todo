const router = require('express').Router()
const todoRouter = require("./todo")
const authRouter = require("./auth")
const {authenticate} = require("../middlewares/auth")
const TodoController = require("../controllers/todoController")

router.get('/', (req,res) => {
  res.send("Hello Rio!")
})

router.get('/quotes',TodoController.getQuotes)

router.use(authRouter)

router.use(authenticate)

router.use(`/todos`, todoRouter )

module.exports = router
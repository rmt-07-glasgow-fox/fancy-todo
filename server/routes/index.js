const router = require("express").Router();
const todosRouter = require("./todos");
const authRouter = require("./auth")
const TodoController = require("../controllers/todo");

router.get("/", TodoController.home);
router.use("/", authRouter);
router.use("/todos", todosRouter);

module.exports = router;

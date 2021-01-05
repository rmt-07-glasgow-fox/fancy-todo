const router = require("express").Router();
const todosRouter = require("./todos");
const authRouter = require("./auth");
const TodoController = require("../controllers/todo");
const { authenticate } = require("../middlewares/auth");

router.get("/", TodoController.home);
router.use("/", authRouter);
router.use(authenticate);
router.use("/todos", todosRouter);

module.exports = router;

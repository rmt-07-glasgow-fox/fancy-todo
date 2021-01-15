const router = require("express").Router();
const todosRouter = require("./todos");
const authRouter = require("./auth");
const TodoController = require("../controllers/todo");
const ApiController = require("../controllers/api");
const { authenticate } = require("../middlewares/auth");

router.get("/", TodoController.home);
router.use("/", authRouter);
router.use(authenticate);
router.get("/news", ApiController.news);
router.get("/quote", ApiController.quote)
router.use("/todos", todosRouter);

module.exports = router;

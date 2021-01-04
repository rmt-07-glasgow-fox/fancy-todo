const router = require("express").Router();
const todosRouter = require("./todos");
const TodoController = require("../controllers/todo");

router.get("/", TodoController.home);
router.use("/todos", todosRouter);

module.exports = router;

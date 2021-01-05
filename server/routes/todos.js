const router = require("express").Router();
const TodoController = require("../controllers/todo");
const { authorize } = require("../middlewares/auth");

router.post("/", TodoController.addTodo);
router.get("/", TodoController.listTodo);
router.get("/:id", authorize, TodoController.detailTodo);
router.put("/:id", authorize, TodoController.updateTodo);
router.patch("/:id", authorize, TodoController.changeStatusTodo);
router.delete("/:id", authorize, TodoController.deleteTodo);

module.exports = router;

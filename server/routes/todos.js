const router = require("express").Router();
const TodoController = require("../controllers/todo");

router.post("/", TodoController.addTodo);
router.get("/", TodoController.listTodo);
router.get("/:id", TodoController.detailTodo);
router.put("/:id", TodoController.updateTodo);
router.patch("/:id", TodoController.changeStatusTodo);
router.delete("/:id", TodoController.deleteTodo);

module.exports = router;

const router = require("express").Router()
const todoController = require("../controllers/todoController")

router.post("/", todoController.createTodo)
router.get("/", todoController.showTodos)
router.get("/:id", todoController.showTodo)
router.put("/:id", todoController.updateTodo)
router.patch("/:id", todoController.updateStatusTodo)
router.delete("/:id", todoController.deleteTodo)

module.exports = router
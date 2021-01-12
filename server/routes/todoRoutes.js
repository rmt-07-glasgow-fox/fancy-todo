const router = require("express").Router()
const TodoController = require("../controllers/todoController")
const {
  authorization,
} = require("../middlewares/middleware")

//logged in user
router.post("/", TodoController.createTask)
router.get("/", TodoController.getAllTask)

//need authorization
router.get("/:id", authorization, TodoController.getOneTask)
router.put("/:id", authorization, TodoController.updateTask)
router.patch("/:id", authorization, TodoController.modifyTask)
router.delete("/:id", authorization, TodoController.deleteTask)

module.exports = router
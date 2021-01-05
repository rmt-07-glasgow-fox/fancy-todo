const router = require("express").Router()
const TodoController = require("../controllers/todoController")
const {
  authorization,
} = require("../middlewares/middleware")

//logged in user
router.post("/", TodoController.createTask)

//need authorization
router.get("/", TodoController.getAllTask)
router.get("/:id", authorization, TodoController.getOneTask)
router.put("/:id", authorization, TodoController.updateTask)
router.patch("/:id", authorization, TodoController.modifyTask)
router.delete("/:id", authorization, TodoController.deleteTask)

module.exports = router
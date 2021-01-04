const router = require("express").Router()
const TodoController = require("../controllers/todoController")

router.post("/todos", TodoController.createTask)
router.get("/todos", TodoController.getAllTask)
router.get("/todos/:id", TodoController.getOneTask)
router.put("/todos/:id", TodoController.updateTask)
router.patch("/todos/:id", TodoController.modifyTask)
router.delete("/todos/:id", TodoController.deleteTask)

module.exports = router
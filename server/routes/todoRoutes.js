const router = require("express").Router()
const TodoController = require("../controllers/todoController")

router.post("/", TodoController.createTask)
router.get("/", TodoController.getAllTask)
router.get("/:id", TodoController.getOneTask)
router.put("/:id", TodoController.updateTask)
router.patch("/:id", TodoController.modifyTask)
router.delete("/:id", TodoController.deleteTask)

module.exports = router
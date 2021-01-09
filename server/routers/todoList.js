const router = require('express').Router()
const ToDoController = require("../controllers/todoController")
const { authorize } = require("../middlewares/auth")

router.get("/todos", ToDoController.showLists)
router.post("/todos", ToDoController.addList)
// router.use(authorize)
router.get("/todos/:id", ToDoController.pickList)
router.put("/todos/:id", ToDoController.updateData)
router.patch("/todos/:id", ToDoController.updateStatus)
router.delete("/todos/:id", ToDoController.deleteList)

module.exports = router
const router = require('express').Router()
const ToDoController = require("../controllers/todoController")
const { authorize } = require("../middlewares/auth")

router.get("/todos", ToDoController.showLists)
router.post("/todos", ToDoController.addList)
router.get("/todos/:id", authorize, ToDoController.pickList)
router.put("/todos/:id", authorize, ToDoController.updateData)
router.patch("/todos/:id", authorize, ToDoController.updateStatus)
router.delete("/todos/:id", authorize, ToDoController.deleteList)

module.exports = router
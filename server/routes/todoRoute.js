const express = require('express')
const router = express.Router()
const TodoController = require('../controllers/todoController')

router.get("/",TodoController.todoPage)
router.get("/:id",TodoController.todoByid)
router.post("/",TodoController.createTodo)
router.put("/:id",TodoController.updateTodo)
router.patch("/:id",TodoController.statusChange)
router.delete("/:id",TodoController.deleteTodo)

module.exports = router
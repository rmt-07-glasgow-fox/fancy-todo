const express = require('express')
const router = express.Router()
const TodoController = require('../controllers/todoController')

router.get("/todos",TodoController.todoPage)
router.get("/todos/:id",TodoController.todoByid)
router.post("/todos",TodoController.createTodo)
router.put("/todos/:id",TodoController.updateTodo)
router.patch("/todos/:id",TodoController.statusChange)
router.delete("/todos/:id",TodoController.deleteTodo)

module.exports = router
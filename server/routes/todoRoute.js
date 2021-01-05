const express = require('express')
const router = express.Router()
const TodoController = require('../controllers/todoController')
const {authorize} = require('../middlewares/auth')

router.get("/todos",TodoController.todoPage)
router.get("/todos/:id",TodoController.todoByid)
router.post("/todos",TodoController.createTodo)
router.put("/todos/:id",authorize, TodoController.updateTodo)
router.patch("/todos/:id",authorize,TodoController.statusChange)
router.delete("/todos/:id",authorize,TodoController.deleteTodo)

module.exports = router
const express = require('express')
const router = express.Router()
const TodoController = require('../controllers/todoController')

router.get("/",TodoController.todoPage)
router.post("/",TodoController.createTodo)

module.exports = router
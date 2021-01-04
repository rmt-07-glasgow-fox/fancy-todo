const router = require('express').Router()
const ToDo = require('../controllers/todo')

router.get('/', (req, res) =>{
    res.send('Test')
})

router.get("/todos", ToDo.todoList)
router.post("/todos", ToDo.addTodo)
router.get("/todos/:id", ToDo.pickTodo)
router.put("/todos/:id", ToDo.updateData)
router.patch("/todos/:id", ToDo.updateStatus)
router.delete("/todos/:id", ToDo.deleteTodo)


module.exports = router
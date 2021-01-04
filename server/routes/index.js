const router = require('express').Router()
const TodoController = require("../controllers/todoController")

router.get('/', (req,res) => {
  res.send("Hello Rio!")
})

router.get(`/todos`, TodoController.getAll)
router.post(`/todos`, TodoController.create)
router.get(`/todos/:id`, TodoController.getById)
router.put(`/todos/:id`, TodoController.edit)
router.patch(`/todos/:id`, TodoController.patch)

router.delete('/todos/:id', TodoController.delete)
module.exports = router
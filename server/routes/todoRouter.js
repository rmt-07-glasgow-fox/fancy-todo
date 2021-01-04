const router = require ("express").Router()
const ToDoController = require ('../controllers/ToDoController')

router.get ('/', ToDoController.getTodos)

router.post ('/', ToDoController.createTodos)

module.exports = router
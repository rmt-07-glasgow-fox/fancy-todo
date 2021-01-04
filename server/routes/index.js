const router = require ("express").Router ()
const TodoController = require("../controllers/todoController")


router.get ("/todos", TodoController.list)
router.post ("/todos", TodoController.linkAddTodo)
router.get ("/todos/:id", TodoController.showDataTodo)
router.put ("/todos/:id", TodoController.replaceTodo)
router.patch ("/todos/:id", TodoController.modifyTodo)
router.delete ("/todos/:id", TodoController.removeTodo)



module.exports = router
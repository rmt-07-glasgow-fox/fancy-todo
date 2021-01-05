const router = require ("express").Router ()
const TodoController = require("../controllers/todoController")
const { authorization } = require ("../middlewares/auth")


router.get ("/", TodoController.list)
router.post ("/", TodoController.linkAddTodo)
router.get ("/:id", authorization, TodoController.showDataTodo)
router.put ("/:id", authorization, TodoController.replaceTodo)
router.patch ("/:id", authorization, TodoController.modifyTodo)
router.delete ("/:id", authorization, TodoController.removeTodo)




module.exports = router
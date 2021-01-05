const router = require ("express").Router ()
const TodoController = require("../controllers/todoController")


router.get ("/", TodoController.list)
router.post ("/", TodoController.linkAddTodo)
router.get ("/:id", TodoController.showDataTodo)
router.put ("/:id", TodoController.replaceTodo)
router.patch ("/:id", TodoController.modifyTodo)
router.delete ("/:id", TodoController.removeTodo)




module.exports = router
const router = require ("express").Router()
const ToDoController = require ('../controllers/ToDoController')

router.get ('/', ToDoController.getTodos)
router.get ('/:id', ToDoController.getOneTodos)

router.post ('/', ToDoController.createTodos)

router.put ('/:id', ToDoController.editTodos)
router.patch ('/:id', ToDoController.patchTodos)

router.delete ('/:id', ToDoController.deleteTodos)

module.exports = router
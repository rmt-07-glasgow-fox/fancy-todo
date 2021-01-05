const router = require ("express").Router()
const ToDoController = require ('../controllers/ToDoController')
const { authorize } = require ('../middlewares/auth')


router.get ('/', ToDoController.getTodos)
router.get ('/:id', ToDoController.getOneTodos)

router.post ('/', ToDoController.createTodos)

// router.use (authorize)
router.put ('/:id', authorize, ToDoController.editTodos)
router.patch ('/:id', authorize, ToDoController.patchTodos)

router.delete ('/:id', authorize, ToDoController.deleteTodos)

module.exports = router
const router = require('express').Router()
const ToDoController = require('../controllers/ToDoController')
const authorize = require('../middlewares/auth').authorize

router.post('/', ToDoController.handleAddTask)
router.get('/', ToDoController.getAllTasks)
router.get('/:id', authorize, ToDoController.getTaskById)
router.put('/:id', authorize, ToDoController.handleEditData)
router.patch('/:id', authorize, ToDoController.handlePatch)
router.delete('/:id', authorize, ToDoController.handleDelete)

module.exports = router
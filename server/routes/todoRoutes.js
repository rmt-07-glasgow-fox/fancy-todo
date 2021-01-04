const router = require('express').Router()
const ToDoController = require('../controllers/ToDoController')

router.post('/', ToDoController.handleAddTask)
router.get('/', ToDoController.getAllTasks)
router.get('/:id', ToDoController.getTaskById)
router.put('/:id', ToDoController.handleEditData)
router.patch('/:id', ToDoController.handlePatch)
router.delete('/:id', ToDoController.handleDelete)

module.exports = router
const TaskController = require('../controllers/taskController')
const router = require('express').Router()

router.post('/', TaskController.createTask)
router.get('/', TaskController.showTasks)
router.get('/:id', TaskController.taskById)
router.put('/:id', TaskController.updateTask)
router.patch('/:id', TaskController.patchTask)
router.delete('/:id', TaskController.deleteTask)

module.exports = router
const TaskController = require('../controllers/taskController')
const router = require('express').Router()
const { authorize } = require('../middlewares/auth')

router.post('/', TaskController.createTask)
router.get('/', TaskController.showTasks)
router.get('/:id', authorize, TaskController.taskById)
router.put('/:id', authorize, TaskController.updateTask)
router.patch('/:id', authorize, TaskController.patchTask)
router.delete('/:id', authorize, TaskController.deleteTask)

module.exports = router
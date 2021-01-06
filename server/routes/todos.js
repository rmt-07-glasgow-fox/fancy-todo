const router = require('express').Router()
const ToDoController = require('../controllers/ToDoController')
const { authorization } = require('../middlewares/auth')

// req.user
router.post('/', ToDoController.createToDo)
router.get('/', ToDoController.showToDos)

// authorization
router.get('/:id', authorization, ToDoController.showToDoById)
router.put('/:id', authorization, ToDoController.editToDo)
router.patch('/:id', authorization, ToDoController.patchStatus)
router.delete('/:id', authorization, ToDoController.deleteToDo)

module.exports = router
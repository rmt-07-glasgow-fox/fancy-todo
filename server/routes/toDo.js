const ToDoController = require('../controllers/toDoController')


const router = require('express').Router()



router.post('/', ToDoController.add)

router.get('/', ToDoController.showAll)


router.get('/:id', ToDoController.showById)

router.put('/:id', ToDoController.replace)

router.patch('/:id', ToDoController.completeToDo)

router.delete('/:id', ToDoController.deleteToDo)




module.exports = router
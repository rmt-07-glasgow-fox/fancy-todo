const ToDoController = require('../controllers/toDoController')
const authentication = require('../middlewares/authentication')
const authorization = require('../middlewares/authorization')



const router = require('express').Router()

router.use(authentication)

router.post('/', ToDoController.add)

router.get('/', ToDoController.showAll)


router.get('/:id', authorization, ToDoController.showById)

router.put('/:id', authorization, ToDoController.replace)

router.patch('/:id', authorization, ToDoController.completeToDo)

router.delete('/:id', authorization, ToDoController.deleteToDo)





module.exports = router
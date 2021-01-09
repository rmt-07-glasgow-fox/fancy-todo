const router = require('express').Router()
const Controller = require('../controllers/todoController')
const { authorize } = require('../middlewares/auth')

router.post('/', Controller.createToDo)
router.get('/', Controller.getAllToDos)
router.get('/:id', authorize, Controller.getToDo)
router.put('/:id', authorize, Controller.updateToDo)
router.patch('/:id', authorize, Controller.modifyToDo)
router.delete('/:id', authorize, Controller.deleteToDo)

module.exports = router
const router = require('express').Router()
const controller = require('../controllers/index')
const { authorize } = require('../middlewares/auth')

router.post('/', controller.createTodo)
router.get('/', controller.readTodo)
router.get('/:id', controller.getOneTodo)

router.put('/:id', authorize, controller.editTodo)
router.patch('/:id', authorize, controller.editStatus)
router.delete('/:id', authorize, controller.deleteTodo)

module.exports = router
const router = require('express').Router()

const TodoController = require('../controller/todoController.js')
const { authUser } = require('../middleware')
const { authorUser } = require('../middleware')


router.get('/', authUser, TodoController.readList)
router.post('/', authUser, TodoController.create)

// router.use('/:id', authorUser)

router.get('/:id',authUser, authorUser, TodoController.getTodoId)
router.put('/:id',authUser, authorUser, TodoController.edit)
router.patch('/:id',authUser, authorUser, TodoController.editStatus)
router.delete('/:id',authUser, authorUser, TodoController.delete)

module.exports = router
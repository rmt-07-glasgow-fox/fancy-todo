const router = require('express').Router()

const Controller = require('../controller/todoController.js')
const { authUser } = require('../middleware')
const { authorUser } = require('../middleware')

// router.use(authUser)

router.get('/', Controller.readList)
router.post('/', Controller.create)

// router.use('/:id', authorUser)

router.get('/:id', Controller.getTodoId)
router.put('/:id', Controller.edit)
router.patch('/:id', Controller.editStatus)
router.delete('/:id', Controller.delete)

module.exports = router
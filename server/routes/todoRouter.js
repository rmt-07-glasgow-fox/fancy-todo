const router = require('express').Router()

const Controller = require('../controller/todoController.js')
const { authentication } = require('../middleware/authentication')
const { authorization } = require('../middleware/authorization')

router.use(authentication)

router.post('/', Controller.create)
router.get('/', Controller.readList)

router.use('/:id', authorization)

router.get('/:id', Controller.getTodoId)
router.put('/:id', Controller.edit)
router.patch('/:id', Controller.editStatus)
router.delete('/:id', Controller.delete)

module.exports = router
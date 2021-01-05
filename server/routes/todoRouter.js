const router = require('express').Router()

const Controller = require('../controller/todoController.js')

router.post('/', Controller.create)
router.get('/', Controller.readList)
router.get('/:id', Controller.getTodoId)
router.put('/:id', Controller.edit)
router.patch('/:id', Controller.editStatus)
router.delete('/:id', Controller.delete)

module.exports = router
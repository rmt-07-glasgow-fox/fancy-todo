const express = require('express')
const router = express.Router()
const Controller = require('../controller/todoCont.js')

router.post('/', Controller.createToDo)
router.get('/', Controller.findAll)
router.get('/:id', Controller.findOne)
router.put('/:id', Controller.updateToDo)
router.patch('/:id', Controller.updateStatus)
router.delete('/:id', Controller.deleteToDo)

module.exports = router;
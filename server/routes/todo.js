const express = require('express')
const router = express.Router()
const Controller = require('../controller/todoCont.js')

console.log('in routes')

router.post('/', Controller.create)
router.get('/', Controller.findAll)
router.get('/:id', Controller.findOne)
router.patch('/:id', Controller.updateStatus)
router.delete('/:id', Controller.deleteToDo)

module.exports = router;
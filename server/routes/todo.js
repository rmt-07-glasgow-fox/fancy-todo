const express = require('express')
const router = express.Router()
const Controller = require('../controller/todoCont.js')
const { authorize } = require('../middlewares/auth')

router.post('/', Controller.createToDo)
router.get('/', Controller.findAll)
router.get('/:id', authorize, Controller.findOne)
router.put('/:id', authorize, Controller.updateToDo)
router.patch('/:id', authorize, Controller.updateStatus)
router.delete('/:id', authorize, Controller.deleteToDo)

module.exports = router;
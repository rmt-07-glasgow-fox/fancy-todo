const express = require('express')
const TodosController = require('../controllers/todos_controller')
const router = express.Router()

router.get('/', TodosController.index)
router.get('/:id', TodosController.show)

router.post('/', TodosController.create)

router.put('/:id', TodosController.updatePut)
router.patch('/:id', TodosController.updatePatch)

router.delete('/:id', TodosController.destroy)


module.exports = router
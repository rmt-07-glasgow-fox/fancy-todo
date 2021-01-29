const express = require('express')
const TodosController = require('../controllers/todos_controller')
const { authorize, authentication } = require('../middlewares/auth')
const router = express.Router()

router.get('/', authentication, TodosController.index)
router.get('/:id', authentication, authorize, TodosController.show)

router.post('/', authentication, TodosController.create)

router.put('/:id', authentication, authorize, TodosController.updatePut)
router.patch('/:id', authentication, authorize, TodosController.updatePatch)

router.delete('/:id', authentication, authorize, TodosController.destroy)

module.exports = router
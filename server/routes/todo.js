const router = require('express').Router()

const Controller = require('../controllers/controller')
const { authorize } = require('../middlewares/auth')

router.route('/')
    .post(Controller.create)
    .get(Controller.showList)

router.route('/:id')
    .get(authorize, Controller.showOne)
    .put(authorize, Controller.edit)
    .patch(authorize, Controller.updateStatus)
    .delete(authorize, Controller.delete)

module.exports = router
const router = require('express').Router()

const Controller = require('../controllers/controller')

router.route('/')
    .post(Controller.create)
    .get(Controller.showList)

router.route('/:id')
    .get(Controller.showOne)
    .put(Controller.edit)
    .patch(Controller.updateStatus)
    .delete(Controller.delete)

module.exports = router
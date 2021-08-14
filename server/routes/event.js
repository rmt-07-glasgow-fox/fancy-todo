const EventController = require('../controllers/eventController')
const { authorize } = require('../middleware/auth')

const router = require('express').Router()

router.get('/',EventController.showAllEvent)
router.post('/',EventController.addEvent)
router.get('/:id',EventController.showOneEvent)
router.use('/:id',authorize)
router.delete('/:id',EventController.deleteEvent)
router.put('/:id',EventController.editEvent)

module.exports = router

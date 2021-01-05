const EventController = require('../controllers/eventController')
const { authorize } = require('../middleware/auth')

const router = require('express').Router()

router.get('/',EventController.showAllEvent)
router.post('/',EventController.addEvent)
router.delete('/:id',authorize,EventController.deleteEvent)
router.put('/:id',authorize,EventController.editEvent)

module.exports = router

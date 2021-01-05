const EventController = require('../controllers/eventController')

const router = require('express').Router()

router.get('/',EventController.showAllEvent)
router.post('/',EventController.addEvent)
router.delete('/:id',EventController.deleteEvent)
router.put('/:id',EventController.editEvent)

module.exports = router

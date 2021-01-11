const router = require('express').Router()
const calendarController = require('../controllers/calendarController')

router.get('/calendar', calendarController.getCalendar)


module.exports = router
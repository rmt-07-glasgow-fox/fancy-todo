const router = require('express').Router()
const Controller = require('../controllers/calendar')

router.get('/calendar', Controller.getCalendar)

module.exports = router
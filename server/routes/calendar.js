const express = require('express')
const router = express.Router()
const Controller = require('../controllers/calendarController')

router.get('/holidays', Controller.getHolidays)


module.exports = router
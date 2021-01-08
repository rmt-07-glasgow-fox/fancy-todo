const Controller = require('../controllers/calendarHoliday')

const route = require('express').Router()

route.get('/holidays', Controller.getHoliday)

module.exports = route
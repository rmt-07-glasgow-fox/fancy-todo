const router = require('express').Router()
const WeatherController = require('../controllers/WeatherController')

router.get('/', WeatherController.currentWeather)

module.exports = router
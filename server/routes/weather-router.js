const router = require('express').Router();
const WeatherController = require('../controllers/weather-controller');

router.get('/', WeatherController.getWeather);

module.exports = router;
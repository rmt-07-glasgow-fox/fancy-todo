const router = require('express').Router();
const WeatherController = require('../controllers/weather-controller');

router.get('/', WeatherController.getWeather);
router.get('/location', WeatherController.getLocation);
router.get('/:id', WeatherController.getWeatherOther);

module.exports = router;
const router = require('express').Router();
const WeatherController = require('../controllers/WeatherController');

router.post('/', WeatherController.currentWeather)

module.exports = router;
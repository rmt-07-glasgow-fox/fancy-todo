const express = require('express');
const router = express.Router();
const Controller = require('../controllers/weatherApi.js');

router.post('/currentWeather', Controller.postCurrentWeather);

module.exports = router;
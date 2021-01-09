const router = require('express').Router();
const {
  openWeatherApi
} = require('../controllers');

router.get('/weather', openWeatherApi.showData)

module.exports = router;
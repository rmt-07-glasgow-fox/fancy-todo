const router = require('express').Router();
const APIController = require('../controllers/apiController.js');

router.get('/weather', APIController.getWeather);

router.get('/location', APIController.getLocation);

router.get('/animelist', APIController.getAnimeList);

module.exports = router;
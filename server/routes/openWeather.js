const express = require('express')
const router = express.Router()
const ApiController = require('../controllers/api-controller')

router.get('/openWeather', ApiController.fetchWeather)

module.exports = router
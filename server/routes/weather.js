const router = require('express').Router()

const weatherController = require('../controllers/weatherController')

router.get('/', weatherController.getWeather)

module.exports = router
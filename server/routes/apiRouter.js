const { ApiController } = require('../controllers/api_controller')

const router = require('express').Router()

router.get('/weather', ApiController.getWeather)

module.exports = router

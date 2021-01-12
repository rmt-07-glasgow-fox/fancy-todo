const router = require('express').Router()
const weatherController = require('../controller/weatherController')


router.get('/weather', weatherController.getWeather)



module.exports = router

const getWeather = require('../controllers/weatherController')

const router = require('express').Router()

router.get('/',getWeather)
module.exports = router

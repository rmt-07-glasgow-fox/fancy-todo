const express = require('express')
const router = express.Router()
const Controller = require('../controller/foreignapi')

router.get('/', Controller.getCurrentWeather)

module.exports = router;
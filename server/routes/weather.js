const router = require('express').Router()
const weatherContoller = require('../controllers/weatherController')

router.get('/', weatherContoller.weather)

module.exports = router
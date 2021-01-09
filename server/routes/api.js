const router = require ('express').Router()
const ApiController = require ('../controllers/ApiController')

router.get ('/weather/:cityName', ApiController.getWeather)

module.exports = router
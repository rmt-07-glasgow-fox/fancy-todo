const apiRoute = require('express').Router()
const apiController = require('../controllers/3rdapi')

apiRoute.get('/weather', apiController.weather)
apiRoute.get('/videos', apiController.videos)

module.exports = apiRoute
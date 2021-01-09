const router = require('express').Router()
const { PublicAPIController } = require('../controllers')

router.get('/news', PublicAPIController.headlineNewsIndonesia)
router.get('/news/:category', PublicAPIController.newsCategory)

router.get('/covid/indonesia', PublicAPIController.covidIndonesia)
router.get('/covid/global', PublicAPIController.covidGlobal)

module.exports = router
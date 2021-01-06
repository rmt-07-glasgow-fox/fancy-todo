const router = require('express').Router()
const newsController = require('../controllers/newsController')

router.get('/', newsController.getData)

module.exports = router
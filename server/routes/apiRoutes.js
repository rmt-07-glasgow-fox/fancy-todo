const APIController = require('../controllers/apiController')
const router = require('express').Router()

router.get('/jokes', APIController.getRandomJoke)

module.exports = router
const router = require('express').Router()
const quoteController = require('../controllers/quoteController');

router.get("/quotes", quoteController.getQuotes)

module.exports = router
const router = require('express').Router();
const QuoteController = require('../controllers/QuoteController')

router.get('/', QuoteController.getQuote)

module.exports = router
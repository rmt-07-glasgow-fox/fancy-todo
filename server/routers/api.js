const router = require('express').Router();
const APIController = require('../controllers/apiController.js');

router.use('/animequote', APIController.getAnimeQuote);

module.exports = router;
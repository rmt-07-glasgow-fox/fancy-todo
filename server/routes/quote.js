const express = require('express');
const router = express.Router();

const { qod } = require('../controllers/quote');

router.get('/qod', qod);

module.exports = router;

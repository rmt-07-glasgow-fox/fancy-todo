const express = require('express');
const router = express.Router();

const requireToken = require('../helpers/requireToken');

const { year, month, day } = require('../controllers/holiday');

router.get('/day', requireToken, day);
router.get('/month', requireToken, month);
router.get('/year', requireToken, year);

module.exports = router;

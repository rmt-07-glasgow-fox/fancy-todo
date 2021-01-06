const express = require('express');
const router = express.Router();

const { year, month, day } = require('../controllers/holiday');

router.get('/day', day);
router.get('/month', month);
router.get('/year', year);

module.exports = router;

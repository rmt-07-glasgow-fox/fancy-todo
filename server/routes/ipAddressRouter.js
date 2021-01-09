const router = require('express').Router();
const IpController = require('../controllers/IpController');

router.get('/', IpController.checkIpAddress);

module.exports = router;
const express = require('express');
const router = express.Router();

const requireToken = require('../helpers/requireToken');

const { list, create } = require('../controllers/project');

router.get('/', requireToken, list);
router.post('/', requireToken, create);

module.exports = router;
